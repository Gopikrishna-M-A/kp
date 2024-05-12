from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib
from fractions import Fraction
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app,origins = "http://localhost:3000",
                methods=["GET", "POST", "PUT", "DELETE"])




# Load the saved model
model_path = 'model.h5'
model = joblib.load(model_path)

# Assuming you also saved the scaler during training
scaler_path = 'scaler.pkl'
scaler = joblib.load(scaler_path)

def predict_water_safety(data):
    # Scale the new data using the loaded scaler
    new_data_df = pd.DataFrame(data)
    new_data_scaled = scaler.transform(new_data_df)

    # Make predictions using the loaded model
    prediction = model.predict(new_data_scaled)[0]

    # Interpret the prediction
    if prediction == 1:
        return True
    else:
        return False

# GET route to fetch all todos
@app.route('/', methods=['GET'])
def get_todos():
    return jsonify("server running")

# POST route to add a new todo
@app.route('/predict', methods=['POST'])
def checkCr():
    new_data = request.json
 
    data = pd.DataFrame(new_data)
    result = predict_water_safety(data)

    return jsonify({'result': result}), 201

if __name__ == '__main__':
    app.run()
