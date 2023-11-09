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
function performHeartDiseasePrediction() {
    const age = document.getElementById('heartAge').value;
    const sex = document.getElementById('heartSex').value;
    const chestPainType = document.getElementById('heartChestPainType').value;
    const restingBP = document.getElementById('heartRestingBP').value;
    const cholesterol = document.getElementById('heartCholesterol').value;
    const fastingBS = document.getElementById('heartFastingBS').value;
    const restingECG = document.getElementById('heartRestingECG').value;
    const maxHR = document.getElementById('heartMaxHR').value;
    const exerciseAngina = document.getElementById('heartExerciseAngina').value;
    const oldpeak = document.getElementById('heartOldpeak').value;
    const stSlope = document.getElementById('heartStSlope').value;

    // Prepare the input data as a JSON object
    const inputData = {
        age: parseInt(age),
        sex: parseInt(sex),
        chestPainType: parseInt(chestPainType),
        restingBP: parseInt(restingBP),
        cholesterol: parseInt(cholesterol),
        fastingBS: parseInt(fastingBS),
        restingECG: parseInt(restingECG),
        maxHR: parseInt(maxHR),
        exerciseAngina: parseInt(exerciseAngina),
        oldpeak: parseFloat(oldpeak),
        stSlope: parseInt(stSlope)
    };

    // Send a POST request to your Flask app's /predict_heart route
    fetch('http://127.0.0.1:5000/predict_heart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Heart Disease Prediction:");
        console.log(data);
        displayDiseasePrediction(data, 'heart');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Sample function for liver disease prediction
function performLiverDiseasePrediction() {
    const age = document.getElementById('liverAge').value;
    const gender = document.getElementById('liverGender').value;
    const totalBilirubin = document.getElementById('liverTotalBilirubin').value;
    const directBilirubin = document.getElementById('liverDirectBilirubin').value;
    const alkphos = document.getElementById('liverAlkphos').value;
    const sgpt = document.getElementById('liverSgpt').value;
    const sgot = document.getElementById('liverSgot').value;
    const totalProteins = document.getElementById('liverTotalProteins').value;
    const albumin = document.getElementById('liverAlbumin').value;
    const agRatio = document.getElementById('liverAgRatio').value;

    // Prepare the input data as a JSON object
    const inputData = {
        Age: parseInt(age),
        Gender: parseInt(gender),
        'Total Bilirubin': parseFloat(totalBilirubin),
        'Direct Bilirubin': parseFloat(directBilirubin),
        'Alkphos Alkaline Phosphotase': parseFloat(alkphos),
        'Sgpt Alamine Aminotransferase': parseFloat(sgpt),
        'Sgot Aspartate Aminotransferase': parseFloat(sgot),
        'Total Protiens': parseFloat(totalProteins),
        'ALB Albumin': parseFloat(albumin),
        'A/G Ratio Albumin and Globulin Ratio': parseFloat(agRatio)
    };

    // Send a POST request to your Flask app's /predict_liver route
    fetch('http://127.0.0.1:5000/predict_liver', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Liver Disease Prediction:");
        console.log(data);
        displayDiseasePrediction(data, 'liver');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Sample function for diabetes prediction
function performDiabetesPrediction() {
    const gender = document.getElementById('diabetesGender').value;
    const age = document.getElementById('diabetesAge').value;
    const hypertension = document.getElementById('diabetesHypertension').value;
    const heartDisease = document.getElementById('diabetesHeartDisease').value;
    const smokingHistory = document.getElementById('diabetesSmokingHistory').value;
    const bmi = document.getElementById('diabetesBmi').value;
    const HbA1cLevel = document.getElementById('diabetesHbA1cLevel').value;
    const bloodGlucoseLevel = document.getElementById('diabetesBloodGlucoseLevel').value;

    // Prepare the input data as a JSON object
    const inputData = {
        gender: parseInt(gender),
        age: parseInt(age),
        hypertension: parseInt(hypertension),
        heart_disease: parseInt(heartDisease),
        smoking_history: parseInt(smokingHistory),
        bmi: parseFloat(bmi),
        HbA1c_level: parseFloat(HbA1cLevel),
        blood_glucose_level: parseFloat(bloodGlucoseLevel)
    };

    // Send a POST request to your Flask app's /predict_diabetes route
    fetch('http://127.0.0.1:5000/predict_diabetes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputData),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Diabetes Prediction:");
        console.log(data);
        displayDiseasePrediction(data, 'diabetes');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function draw gaugechart
function drawGaugeChart(percentage) {
    const canvas = document.getElementById('gaugeChart');
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set gauge chart properties
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const startAngle = 0; // Start at 0 degrees
    const endAngle = 2 * Math.PI; // End angle is 360 degrees (full circle)
    const counterClockwise = false; // Draw clockwise for a full circle

    // Draw the background circle in gray
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.lineWidth = 10;
    context.strokeStyle = '#ccc'; // Grey color for the background circle
    context.stroke();

    // Calculate the angle for the percentage
    const angle = (percentage / 100) * (2 * Math.PI);

    // Draw the filled arc with orange for 100%, or green for other percentages
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, angle, counterClockwise);
    context.lineWidth = 10;

    // Choose the color based on the percentage
    if (percentage < 50) {
        context.strokeStyle = '#4CAF50'; // Green color for percentages less than 100%
    } else {
        context.strokeStyle = '#ff5b55'; // Orange color for 100%
    }

    context.stroke();

    // Add the percentage text in the center
    context.fillStyle = '#000';
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(percentage + '%', centerX, centerY);
}




// Function to display the disease prediction result
function displayDiseasePrediction(data, disease) {
    // Display the prediction data based on the selected disease
    const predictionMessage = document.getElementById('predictionMessage');
    predictionMessage.textContent = `${disease.charAt(0).toUpperCase() + disease.slice(1)} Disease Prediction:`;

    const predictionList = data.prediction;
    const listContainer = document.createElement('ul');
    predictionList.forEach(item => {
        // Convert the prediction result to a percentage
        const percentage = (item * 100).toFixed(2);
        const listItem = document.createElement('li');

        if (percentage > 50) {
            listItem.textContent = `${percentage}% - You are at high risk of the disease`;
        } else {
            listItem.textContent = `${percentage}% - You are not at high risk of the disease`;
        }

        listContainer.appendChild(listItem);

        // Add the gauge chart
        drawGaugeChart(parseFloat(percentage));
    });

    predictionMessage.appendChild(listContainer);
} 

   






// Add event listener for the "Predict" button
function predictDisease() {
    const selectedDisease = document.getElementById('diseaseSelect').value;
    if (selectedDisease === 'heart') {
        performHeartDiseasePrediction();
    } else if (selectedDisease === 'liver') {
        performLiverDiseasePrediction();
    } else if (selectedDisease === 'diabetes') {
        performDiabetesPrediction();
    }
}

// Add event listener for disease selection change
document.getElementById('diseaseSelect').addEventListener('change', showDiseaseForm);
