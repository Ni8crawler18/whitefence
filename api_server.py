from flask import Flask, request, jsonify
from flask_cors import CORS   
from api.network_api import check_fraud
import json

app = Flask(__name__)
CORS(app) 

@app.route("/check", methods=["GET"])
def check_number():
    phone = request.args.get("phone")
    if not phone:
        return jsonify({"error": "Phone number required"}), 400

    phone = phone.strip()
    if not phone.startswith("+"):
        phone = "+" + phone

    try:
        result = check_fraud(phone)
        return jsonify(json.loads(result))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
