import requests
import os
from dotenv import load_dotenv
from twilio.rest import Client
from datetime import datetime

# Load environment variables
load_dotenv()

API_KEY = os.getenv("RAPIDAPI_KEY")
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH")
TWILIO_VERIFY_SERVICE = os.getenv("TWILIO_VERIFY_SERVICE")
OTP_RECEIVER = os.getenv("OTP_RECEIVER")

if not all([API_KEY, TWILIO_SID, TWILIO_AUTH, TWILIO_VERIFY_SERVICE, OTP_RECEIVER]):
    raise ValueError("Missing keys in .env. Check all Twilio & Nokia keys.")

HEADERS = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "network-as-code.nokia.rapidapi.com",
    "Content-Type": "application/json"
}

def initiate_transaction():
    return input("Do you want to initiate a transaction? (yes/no): ").strip().lower() == "yes"

def get_phone_number():
    return input("Enter mobile number (with country code, e.g., +919876543210): ").strip()

def call_api(url, payload):
    try:
        response = requests.post(url, json=payload, headers=HEADERS, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def send_otp_via_twilio(phone_number):
    client = Client(TWILIO_SID, TWILIO_AUTH)
    verification = client.verify.services(TWILIO_VERIFY_SERVICE).verifications.create(
        to=phone_number,
        channel="sms"
    )
    print(f"\n✅ OTP sent to {phone_number}. Status: {verification.status}")
    return verification.sid

def check_otp(phone_number, code):
    client = Client(TWILIO_SID, TWILIO_AUTH)
    verification_check = client.verify.services(TWILIO_VERIFY_SERVICE).verification_checks.create(
        to=phone_number,
        code=code
    )
    return verification_check.status == "approved"

def format_date(iso_date_str):
    try:
        # Remove trailing 'Z' if present
        if iso_date_str.endswith("Z"):
            iso_date_str = iso_date_str[:-1]
        # Parse the ISO string
        dt = datetime.fromisoformat(iso_date_str)
        # Format it nicely
        return dt.strftime("%d %b %Y, %H:%M UTC")
    except Exception:
        return iso_date_str

def run_checks(phone_number):
    apis = [
        {
            "name": "SIM Swap Check",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/sim-swap/sim-swap/v0/check",
            "payload": {"phoneNumber": phone_number, "maxAge": 240},
            "show_date": False
        },
        {
            "name": "SIM Swap Retrieve Date",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/sim-swap/sim-swap/v0/retrieve-date",
            "payload": {"phoneNumber": phone_number},
            "show_date": True
        },
        {
            "name": "Device Swap Check",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/device-swap/device-swap/v1/check",
            "payload": {"phoneNumber": phone_number, "maxAge": 120},
            "show_date": False
        },
        {
            "name": "Device Swap Retrieve Date",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/device-swap/device-swap/v1/retrieve-date",
            "payload": {"phoneNumber": phone_number},
            "show_date": True
        },
        {
            "name": "Location Verification",
            "url": "https://network-as-code.p-eu.rapidapi.com/location-verification/v1/verify",
            "payload": {
                "device": {"phoneNumber": phone_number},
                "area": {
                    "areaType": "CIRCLE",
                    "center": {"latitude": 50.735851, "longitude": 7.10066},
                    "radius": 50000
                }
            },
            "show_date": False
        }
    ]

    all_passed = True
    for api in apis:
        print(f"\n🔍 Running {api['name']}...")
        result = call_api(api["url"], api["payload"])

        if "error" in result:
            print(f"❌ {api['name']} failed -> {result['error']}")
            all_passed = False
        else:
            if api.get("show_date"):
                date_value = result.get("latestSimChange") or result.get("latestDeviceChange") or result.get("date")
                if date_value:
                    readable_date = format_date(date_value)
                    print(f"✅ {api['name']} passed -> Date: {readable_date}")
                else:
                    print(f"✅ {api['name']} passed -> Date not found in response")
            else:
                print(f"✅ {api['name']} passed")


    return all_passed


if __name__ == "__main__":
    if initiate_transaction():
        number = get_phone_number() # +99999991001
        if run_checks(number):
            print("\n🎉 All checks passed! Sending OTP...")
            send_otp_via_twilio(OTP_RECEIVER)
            entered = input("Enter OTP received: ").strip()
            if check_otp(OTP_RECEIVER, entered):
                print("✅ OTP verified successfully! Transaction complete.")
            else:
                print("❌ Incorrect OTP. Transaction failed.")
        else:
            print("\n⚠️ Some checks failed. OTP not sent.")
    else:
        print("Transaction cancelled.")
