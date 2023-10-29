import pickle
import pandas as pd
import requests
import app as a

# Load the SVM model from the pickle file
model_pkl_file = "/Users/vanphan/Downloads/project_4/project_folder/rf_classifier.pkl"
model = None
with open(model_pkl_file, 'rb') as file:
    model = pickle.load(file)


print("BEGIN processing")
# Extract relevant features from the input data
age = 48
sex = 1
chest_pain_type = a.convert_chest_pain_type("NAP")
resting_bp = 132334324
cholesterol = 1000
fasting_bs = 0
resting_ecg = a.convert_resting_ecg("Normal")
max_hr = 1323332
exercise_angina = 0
oldpeak = 213423
st_slope = a.convert_st_slope("Up")

preprocessed_data = {
    'age': [age],
    'sex': [sex],
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

test_data_2 = {
        'age': age,
        'sex': sex,
        'chest_pain_type': chest_pain_type,
        'resting_bp': resting_bp,
        'cholesterol': cholesterol,
        'fasting_bs': fasting_bs,
        'resting_ecg': resting_ecg,
        'max_hr': max_hr,
        'exercise_angina': exercise_angina,
        'oldpeak': oldpeak,
        'st_slope': st_slope
    }


heart_analyze = pd.DataFrame(preprocessed_data)
print(heart_analyze)
prediction = model.predict(heart_analyze)
print(prediction)


# url = 'http://127.0.0.1:5000/predict'
# myobj = test_data_2
# x = requests.post(url, json=myobj)