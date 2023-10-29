import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the SVM model from the pickle file
model_pkl_file = "/Users/vanphan/Downloads/project_4/project_folder/rf_classifier.pkl"
model = None
with open(model_pkl_file, 'rb') as file:
    model = pickle.load(file)

# Root route to provide a welcome message
@app.route('/')
def index():
    return "Welcome to the Disease Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get input data from the web form or API request
    if data is None:
        return jsonify({'error': 'Invalid input data'}), 400  # Handle missing or invalid data
    print(data)
    heart_analyze = preprocess_input(data)  # Replace with your preprocessing function

    if heart_analyze is None:
        return jsonify({'error': 'Failed to preprocess input data'}), 400  # Handle preprocessing errors

    # Use the loaded model to make predictions
    prediction = model.predict(heart_analyze)  # Replace with your data
    print(prediction)

    # Return the prediction result
    return jsonify({'prediction': prediction.tolist()})


def preprocess_input(input_data):
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
    
    preprocessed_data = {
        'age': [age],
        'sex': [int(sex)],
        'chest_pain_type': [chest_pain_type],
        'resting_bp': [resting_bp],
        'cholesterol': [cholesterol],
        'fasting_bs': [fasting_bs],
        'resting_ecg': [resting_ecg],
        'max_hr': [max_hr],
        'exercise_angina': [exercise_angina],
        'oldpeak': [oldpeak],
        'st_slope': [st_slope]
    }

    return pd.DataFrame(preprocessed_data)

def convert_chest_pain_type(chest_pain_type):
    if chest_pain_type == 'ASY':
        return 0
    elif chest_pain_type == 'ATA':
        return 1
    elif chest_pain_type == 'NAP':
        return 2
    elif chest_pain_type == 'TA':
        return 3
    else:
        return -1  # Handle unknown values as needed

def convert_resting_ecg(resting_ecg):
    if resting_ecg == 'Normal':
        return 1
    elif resting_ecg == 'ST':
        return 2
    elif resting_ecg == 'LHV':
        return 0
    else:
        return -1 

def convert_st_slope(st_slope):
    if st_slope == 'Flat':
        return 1
    elif st_slope == 'Up':
        return 0
    elif st_slope == 'Down':
        return 2
    else:
        return -1  

if __name__ == '__main__':
    app.run(debug=True)
