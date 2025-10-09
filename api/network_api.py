import os
import json
from dotenv import load_dotenv
import network_as_code as nac
from network_as_code.models.device import Device

# Load environment variables
load_dotenv()
TOKEN = os.getenv("TOKEN")

# Initialize client
client = nac.NetworkAsCodeClient(token=TOKEN)

# Replace with dynamic user number during transaction
PHONE_NUMBER = "+99999991001"
MAX_AGE_HOURS = 24

def check_fraud(phone_number: str):
    """Checks for SIM swap, device swap, and retrieves location if suspicious."""
    my_device = client.devices.get(phone_number=phone_number)

    # Perform checks
    sim_swap = my_device.verify_sim_swap(max_age=MAX_AGE_HOURS)
    device_swap = my_device.verify_device_swap(max_age=MAX_AGE_HOURS)

    # If any suspicious activity detected
    if sim_swap or device_swap:
        fraud_details = {
            "msisdn": phone_number,
            "sim_swap_detected": sim_swap,
            "device_swap_detected": device_swap,
            "sim_swap_date": None,
            "device_swap_date": None,
            "location": None,
            "status": "Suspicious Activity Detected",
            "action": "OTP blocked, review required"
        }

        if sim_swap:
            fraud_details["sim_swap_date"] = my_device.get_sim_swap_date().isoformat()
        if device_swap:
            fraud_details["device_swap_date"] = my_device.get_device_swap_date().isoformat()

        # Get latest device location
        try:
            location_obj = my_device.location(max_age=3600)

            # Convert the custom object to dict safely
            if hasattr(location_obj, "__dict__"):
                fraud_details["location"] = location_obj.__dict__
            else:
                fraud_details["location"] = str(location_obj)

        except Exception as e:
            fraud_details["location"] = f"Location retrieval failed: {e}"

        # Return JSON-friendly structure
        return json.dumps(fraud_details, indent=4, default=str)

    # If everything is clean
    return json.dumps({
        "msisdn": phone_number,
        "status": "No issues detected",
        "action": "OTP can be sent successfully"
    }, indent=4)


if __name__ == "__main__":
    result = check_fraud(PHONE_NUMBER)
    print(result)
