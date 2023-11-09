import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np




app = Flask(__name__)
CORS(app)


# Root route to provide a welcome message
@app.route('/')
def index():
    return "Welcome to the Disease Prediction API"
# Heart Disease
# Load the prediction model from the pickle file
heart_model_file = "Models/model_heart.pkl"
model_heart = None
with open(heart_model_file, 'rb') as file:
    model_heart = pickle.load(file)

# Load the scaler model from the pickle file
heart_scaler_file = "Resources/heart_scaler.pkl"
scaler_heart = None
with open(heart_scaler_file, 'rb') as file:
    scaler_heart = pickle.load(file)

@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    try:
        # Get input data from the web form or API request
        data = request.get_json()
        print(data)
        if data is None:
            return jsonify({'error': 'Invalid input data'}), 400  # Handle missing or invalid data

        # Replace with your preprocessing function
        preprocessed_data = preprocess_input_heart(data)

        if preprocessed_data is None:
            return jsonify({'error': 'Failed to preprocess input data'}), 400  # Handle preprocessing errors

        # Use the loaded model to make predictions
        scaled_data = scaler_heart.transform(preprocessed_data)
        prediction = model_heart.predict(scaled_data)
        print(prediction)

        return jsonify({'prediction': prediction.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Handle any unexpected errors

def preprocess_input_heart(input_data):
    # Extract relevant features from the input data
    age = input_data.get('age', 0)
    sex = input_data.get('sex', 'unknown')
    chest_pain_type = input_data.get('chest_pain_type', 'unknown')
    resting_bp = input_data.get('resting_bp', 0)
    cholesterol = input_data.get('cholesterol', 0)
    fasting_bs = input_data.get('fasting_bs', 0)
    resting_ecg = input_data.get('resting_ecg', 'unknown')
    max_hr = input_data.get('max_hr', 0)
    exercise_angina = input_data.get('exercise_angina', 'unknown')
    oldpeak = input_data.get('oldpeak', 0)
    st_slope = input_data.get('st_slope', 'unknown')
    
    preprocessed_data = np.array([[age, sex.value, chest_pain_type.value,
                                  resting_bp, cholesterol, fasting_bs,
                                  resting_ecg.value, max_hr,
                                  exercise_angina.value,
                                  oldpeak, st_slope.value]])
    print(preprocessed_data)
    
    return preprocessed_data

def preprocess_input_heart(input_data):
    # Extract relevant features from the input data
    age = float(input_data.get('age', 0))
    sex = float(input_data.get('sex', np.nan))
    chest_pain_type = float(input_data.get('chestPainType', np.nan))
    resting_bp = float(input_data.get('restingBP', np.nan))
    cholesterol = float(input_data.get('cholesterol', np.nan))
    fasting_bs = float(input_data.get('fastingBS', np.nan))
    resting_ecg = float(input_data.get('restingECG', np.nan))
    max_hr = float(input_data.get('maxHR', np.nan))
    exercise_angina = float(input_data.get('exerciseAngina', np.nan))
    oldpeak = float(input_data.get('oldpeak', np.nan))
    st_slope = float(input_data.get('stSlope', np.nan))

    
    preprocessed_data = np.array([[age, sex,chest_pain_type,
                                  resting_bp, cholesterol, fasting_bs,
                                  resting_ecg, max_hr,
                                  exercise_angina,
                                  oldpeak, st_slope]])
    print(preprocessed_data)
    return preprocessed_data


# Diabetes Prediction
# Load the prediction model from the pickle file
diabetes_model_file = "Models/model_diabetes.pkl"
model_diabetes = None
with open(diabetes_model_file, 'rb') as file:
    model_diabetes = pickle.load(file)

# Load the scaler model from the pickle file 
diabetes_scaler_file = "Resources/diabetes_scaler.pkl"
scaler_diabetes = None
with open(diabetes_scaler_file, 'rb') as file:
    scaler_diabetes = pickle.load(file)

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    try:
        # Get input data from the web form or API request
        data = request.get_json()
        print(data)
        if data is None:
            return jsonify({'error': 'Invalid input data'}), 400  

        # Replace with your preprocessing function for diabetes
        preprocessed_data = preprocess_input_diabetes(data)
        print(preprocessed_data)

        if preprocessed_data is None:
            return jsonify({'error': 'Failed to preprocess input data'}), 400  # Handle preprocessing errors

        # Use the loaded model for diabetes to make predictions
        if scaler_diabetes:
            scaled_data = scaler_diabetes.transform(preprocessed_data)
        else:
            scaled_data = preprocessed_data  
        prediction = model_diabetes.predict_proba(scaled_data)[:,1]
        print(prediction)

        return jsonify({'prediction': prediction.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500  
def preprocess_input_diabetes(input_data):
    gender = input_data.get('gender', 'unknown')
    age = input_data.get('age', 0)
    hypertension = input_data.get('hypertension', 0)
    heart_disease = input_data.get('heart_disease', 0)
    smoking_history = input_data.get('smoking_history', 'unknown')
    bmi = input_data.get('bmi', 0)
    HbA1c_level = input_data.get('HbA1c_level', 0)
    blood_glucose_level = input_data.get('blood_glucose_level', 0)

    preprocessed_data = np.array([[
        gender, age, hypertension, heart_disease, smoking_history, bmi,
        HbA1c_level, blood_glucose_level
    ]])
    print(preprocessed_data)
    

def preprocess_input_diabetes(input_data):
    # Extract relevant features from the input data
    gender = float(input_data.get('gender', np.nan))
    age = float(input_data.get('age', np.nan))
    hypertension = float(input_data.get('hypertension', np.nan))
    heart_disease = float(input_data.get('heart_disease', np.nan))
    smoking_history = float(input_data.get('smoking_history', np.nan))
    bmi = float(input_data.get('bmi', np.nan))
    HbA1c_level = float(input_data.get('HbA1c_level', np.nan))
    blood_glucose_level = float(input_data.get('blood_glucose_level', np.nan))

    # Assemble the preprocessed data as a feature vector
    preprocessed_data = np.array([[
        gender, age, hypertension, heart_disease, smoking_history, bmi,
        HbA1c_level, blood_glucose_level
    ]])
    print(preprocessed_data)
    return preprocessed_data



    


if __name__ == '__main__':
    app.run(debug=True)
