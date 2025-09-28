import requests
import os
from dotenv import load_dotenv


load_dotenv()
API_KEY = os.getenv("RAPIDAPI_KEY")

if not API_KEY:
    raise ValueError("API key not found in .env file! Please add RAPIDAPI_KEY.")

HEADERS = {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "network-as-code.nokia.rapidapi.com",
    "Content-Type": "application/json"
}

def initiate_transaction():
    confirm = input("Do you want to initiate a transaction? (yes/no): ").strip().lower()
    return confirm == "yes"

def get_phone_number():
    phone = input("Enter mobile number (with country code, e.g., +919876543210): ").strip()
    return phone

def call_api(url, payload):
    try:
        response = requests.post(url, json=payload, headers=HEADERS, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def run_checks(phone_number):
    apis = [
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
            }
        },
        {
            "name": "Number Verification",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/number-verification/number-verification/v0/verify",
            "payload": {"phoneNumber": phone_number}
        },
        {
            "name": "SIM Swap Check",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/sim-swap/sim-swap/v0/check",
            "payload": {"phoneNumber": phone_number, "maxAge": 240}
        },
        {
            "name": "Device Swap Check",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/device-swap/device-swap/v1/check",
            "payload": {"phoneNumber": phone_number, "maxAge": 120}
        },
        {
            "name": "SIM Swap Retrieve Date",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/sim-swap/sim-swap/v0/retrieve-date",
            "payload": {"phoneNumber": phone_number}
        }
    ]

    for api in apis:
        print(f"\n🔍 Running {api['name']}...")
        result = call_api(api["url"], api["payload"])
        print(result)

if __name__ == "__main__":
    if initiate_transaction():
        number = get_phone_number()
        run_checks(number)
    else:
        print("Transaction cancelled.")
