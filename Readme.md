# Whitefence

## Project Purpose

This project is crucial for enhancing security and preventing fraud by utilizing the Nokia API to provide robust verification services. It enables the detection and verification of critical events such as SIM swaps, device swaps, and location changes. Furthermore, it implements One-Time Password (OTP) authentication to secure any detected swaps, ensuring the integrity of user accounts and transactions.

## Project Features

## Project Features

(Please add a detailed description of the project's features here.)

This is a Python web application.

### Verification Services:
*   **SIM Swap Detection and Verification**: Crucial for identifying unauthorized changes to a user's SIM card, which can be a vector for account takeovers.
*   **Device Swap Detection and Verification**: Helps detect if a user's device has been changed unexpectedly, protecting against account compromise.
*   **Location Verification**: Ensures that user activities are originating from expected geographical locations, adding a layer of security against remote attacks.
*   **OTP Authentication for Swaps**: Provides an additional security step by requiring a One-Time Password for any detected swaps, confirming the legitimacy of the change.

## Technologies Used

* Python
* Flask (inferred from app.py and common for Python web apps)
* HTML/CSS/JavaScript (inferred from templates/index.html)

## Setup and Running

1. Clone the repository:
   ```bash
   git clone https://github.com/Ni8crawler18/whitefence
   cd whitefence
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   python app.py
   ```
   The application will be available at http://localhost:5000 (or another port if 5000 is in use).


