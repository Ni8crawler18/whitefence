from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from twilio.rest import Client
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# EXACT CONFIGURATION FROM YOUR ORIGINAL SCRIPT
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

# EXACT FUNCTION FROM YOUR ORIGINAL SCRIPT
def call_api(url, payload):
    try:
        response = requests.post(url, json=payload, headers=HEADERS, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

# EXACT FUNCTION FROM YOUR ORIGINAL SCRIPT
def send_otp_via_twilio(phone_number):
    client = Client(TWILIO_SID, TWILIO_AUTH)
    verification = client.verify.services(TWILIO_VERIFY_SERVICE).verifications.create(
        to=phone_number,
        channel="sms"
    )
    return {"success": True, "status": verification.status, "sid": verification.sid}

# EXACT FUNCTION FROM YOUR ORIGINAL SCRIPT
def check_otp(phone_number, code):
    client = Client(TWILIO_SID, TWILIO_AUTH)
    verification_check = client.verify.services(TWILIO_VERIFY_SERVICE).verification_checks.create(
        to=phone_number,
        code=code
    )
    return verification_check.status == "approved"

# EXACT FUNCTION FROM YOUR ORIGINAL SCRIPT
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

@app.route('/')
def index():
    """Serve the main HTML page"""
    return render_template('index.html')

@app.route('/api/security-checks/start', methods=['POST'])
def start_security_checks():
    """Initialize security checks session"""
    data = request.get_json()
    phone_number = data.get('phoneNumber')
    
    if not phone_number:
        return jsonify({"success": False, "error": "Phone number is required"}), 400
    
    return jsonify({
        "success": True,
        "total_checks": 5,
        "message": "Security checks session started"
    })

@app.route('/api/security-checks/run/<int:check_index>', methods=['POST'])
def run_single_security_check(check_index):
    data = request.get_json()
    phone_number = data.get('phoneNumber')

    if not phone_number:
        return jsonify({"success": False, "error": "Phone number is required"}), 400

    apis = [
        {
            "name": "SIM Swap Check",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/sim-swap/sim-swap/v0/check",
            "payload": {"phoneNumber": phone_number, "maxAge": 240},
            "show_date": False,
            "check_type": "sim_swap"
        },
        {
            "name": "SIM Swap Retrieve Date",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/sim-swap/sim-swap/v0/retrieve-date",
            "payload": {"phoneNumber": phone_number},
            "show_date": True,
            "check_type": "sim_swap"
        },
        {
            "name": "Device Swap Check",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/device-swap/device-swap/v1/check",
            "payload": {"phoneNumber": phone_number, "maxAge": 120},
            "show_date": False,
            "check_type": "device_swap"
        },
        {
            "name": "Device Swap Retrieve Date",
            "url": "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/device-swap/device-swap/v1/retrieve-date",
            "payload": {"phoneNumber": phone_number},
            "show_date": True,
            "check_type": "device_swap"
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
            "show_date": False,
            "check_type": "location"
        }
    ]

    if check_index >= len(apis):
        return jsonify({"success": False, "error": "Invalid check index"}), 400

    api = apis[check_index]
    print(f"\n🔍 Running {api['name']}...")
    result = call_api(api["url"], api["payload"])

    if "error" in result:
        return jsonify({
            "success": False,
            "check_index": check_index,
            "name": api["name"],
            "error": result["error"],
            "result_text": f"Failed: {result['error']}"
        })
    # Combined SIM/Device Swap check
    if api["check_type"] in ["sim_swap", "device_swap"]:
        # Always call the CHECK API first
        check_url = "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/sim-swap/sim-swap/v0/check" \
            if api["check_type"] == "sim_swap" else \
            "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/device-swap/device-swap/v1/check"

        check_result = call_api(check_url, api["payload"])
        swapped = check_result.get("swapped", False)

        if not api.get("show_date"):
            if swapped:
                result_text = f"{api['name']} detected"
                return jsonify({
                    "success": False,
                    "check_index": check_index,
                    "name": api["name"],
                    "data": check_result,
                    "result_text": result_text
                })
            else:
                result_text = f"No recent {api['check_type'].replace('_', ' ')} detected"
                return jsonify({
                    "success": True,
                    "check_index": check_index,
                    "name": api["name"],
                    "data": check_result,
                    "result_text": result_text
                })

        else:
            if not swapped:
                return jsonify({
                    "success": True,
                    "check_index": check_index,
                    "name": api["name"],
                    "data": {},
                    "result_text": ""
                })

            retrieve_url = "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/sim-swap/sim-swap/v0/retrieve-date" \
                if api["check_type"] == "sim_swap" else \
                "https://network-as-code.p-eu.rapidapi.com/passthrough/camara/v1/device-swap/device-swap/v1/retrieve-date"
            retrieve_result = call_api(retrieve_url, {"phoneNumber": api["payload"]["phoneNumber"]})

            date_key = "latestSimChange" if api["check_type"] == "sim_swap" else "latestDeviceChange"
            date_value = retrieve_result.get(date_key)

            if date_value:
                readable_date = format_date(date_value)
                result_text = f"Last {api['check_type'].replace('_', ' ')}: {readable_date}"
            else:
                result_text = f"Last {api['check_type'].replace('_', ' ')}: Date not available"

            return jsonify({
                "success": False,
                "check_index": check_index,
                "name": api["name"],
                "data": {"check": check_result, "retrieve": retrieve_result},
                "result_text": result_text
            })


    elif api["check_type"] == "location":
        verification_result = result.get("verificationResult", "FALSE")
        last_time = result.get("lastLocationTime")
        match_rate = result.get("matchRate", 0)
        readable_time = format_date(last_time) if last_time else None

        result_text = f"Location Verified: {verification_result}, Match Rate: {match_rate}%"
        if readable_time:
            result_text += f", Last Location Time: {readable_time}"

        return jsonify({
            "success": True,
            "check_index": check_index,
            "name": api["name"],
            "data": result,
            "result_text": result_text
        })

    return jsonify({
        "success": True,
        "check_index": check_index,
        "name": api["name"],
        "data": result,
        "result_text": "Check passed"
    })


@app.route('/api/security-checks/summary', methods=['POST'])
def get_security_summary():
    """Get summary after all checks are complete"""
    data = request.get_json()
    results = data.get('results', [])
    
    all_passed = all(result.get('success', False) for result in results)
    
    return jsonify({
        "success": True,
        "all_passed": all_passed,
        "total_checks": len(results),
        "passed_checks": sum(1 for r in results if r.get('success', False)),
        "message": "All security checks completed successfully" if all_passed else "Some security checks failed"
    })

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    phone_number = OTP_RECEIVER
    try:
        client = Client(TWILIO_SID, TWILIO_AUTH)
        verification = client.verify.services(TWILIO_VERIFY_SERVICE).verifications.create(
            to=phone_number,
            channel="sms"
        )
        return jsonify({
            "success": True,
            "message": "OTP sent",
            "status": verification.status
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    """Verify the OTP code"""
    data = request.get_json()
    phone_number = OTP_RECEIVER
    otp_code = data.get('otpCode')
    
    if not otp_code:
        return jsonify({"success": False, "error": "OTP code is required"}), 400
    
    try:
        is_approved = check_otp(phone_number, otp_code)
        
        if is_approved:
            return jsonify({
                "success": True,
                "approved": True,
                "message": "OTP verified successfully! Transaction complete."
            })
        else:
            return jsonify({
                "success": True,
                "approved": False,
                "message": "Incorrect OTP. Transaction failed."
            })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)