// Function to show the appropriate disease prediction form
function showDiseaseForm() {
    const selectedDisease = document.getElementById('diseaseSelect').value;
    const diseaseForms = document.querySelectorAll('.disease-form');
    
    // Hide all disease forms
    diseaseForms.forEach(form => form.style.display = 'none');

    // Show the selected disease form
    if (selectedDisease !== 'none') {
        const selectedForm = document.getElementById(`${selectedDisease}Form`);
        selectedForm.style.display = 'block';
    }
}

// Sample function for heart disease prediction 
function performHeartDiseasePrediction(age, sex, chestPainType, restingBP, cholesterol, fastingBS, restingECG, maxHR, exerciseAngina, oldpeak, stSlope) {
    const headers = {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
    
    // Prepare the input data as a JSON object
    const inputData = {
        age: age,
        sex: sex,
        chest_pain_type: chestPainType,
        resting_bp: restingBP,
        cholesterol: cholesterol,
        fasting_bs: fastingBS,
        resting_ecg: restingECG,
        max_hr: maxHR,
        exercise_angina: exerciseAngina,
        oldpeak: oldpeak,
        st_slope: stSlope
    };

    // Send a POST request to your Flask app's /predict route
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(inputData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the prediction result
        displayHeartDiseasePrediction(data);
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
}

// Function to display the heart disease prediction result
function displayHeartDiseasePrediction(data) {
    const predictionMessage = document.getElementById('predictionMessage');
    const heartDiseaseChart = document.getElementById('heartDiseaseChart');

    // Display the prediction message
    predictionMessage.textContent = data.prediction[0] ? 'You are at risk of heart disease.' : 'You are not at risk of heart disease.';

   
}



// Add event listener for the "Predict" button
function predictHeart() {
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const chestPainType = document.getElementById('chestPainType').value;
    const restingBP = document.getElementById('restingBP').value;
    const cholesterol = document.getElementById('cholesterol').value;
    const fastingBS = document.getElementById('fastingBS').value;
    const restingECG = document.getElementById('restingECG').value;
    const maxHR = document.getElementById('maxHR').value;
    const exerciseAngina = document.getElementById('exerciseAngina').value;
    const oldpeak = document.getElementById('oldpeak').value;
    const stSlope = document.getElementById('stSlope').value;

    performHeartDiseasePrediction(age, sex, chestPainType, restingBP, cholesterol, fastingBS, restingECG, maxHR, exerciseAngina, oldpeak, stSlope);
}

// Add event listener for disease selection change
document.getElementById('diseaseSelect').addEventListener('change', showDiseaseForm);
