
const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById('newfortune');
const inspireContainer = document.getElementById('Inspire-container');
const form = document.querySelector('form')

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

// Add a New Feature code on the front-end 

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

fortuneBtn.addEventListener('click', getFortune)

// for Inspiration for Success front-end js code 

const baseURL = "http://localhost:4000/api/inspires"

const inspireCallback = ({ data: inspires }) => displayInspires(inspires)
const errCallback = err => console.log(err.response.data)

// GET request

const getAllInspires = () => axios
                    .get(baseURL)
                    .then(inspireCallback)
                    .catch(errCallback)
const createInspire = body => axios
                          .post(baseURL, body)
                          .then(inspireCallback)
                          .catch(errCallback)
const updateInspire = (id, type) => axios
                    .put(`${baseURL}/${id}`, {type})
                    .then(inspireCallback)
                    .catch(errCallback)
const deleteInspire = id => axios
                    .delete(`${baseURL}/${id}`)
                    .then(inspireCallback)
                    .catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#inspirationlname')
    let words = document.querySelector('#inspiringwords')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        words: words.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createInspire(bodyObj)

    name.value = ''
    words.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createInspireCard(inspire) {
    const inspireCard = document.createElement('div')
    inspireCard.classList.add('inspire-card') 

    inspireCard.innerHTML =
    `<img alt='inspire cover' src=${inspire.imageURL} class="inspire-cover"/>
    <p class="inspire-words">${inspire.words}</p>
    <p class="inspire-name">${inspire.name}</p>
    <div class="btns-container">
        <button onclick="updateInspire(${inspire.id}, 'minus')">-</button>
        <p class="inspire-rating">${inspire.rating} stars</p>
        <button onclick="updateInspire(${inspire.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteInspire(${inspire.id})" class = "dlt-btn">delete</button>
    `


    inspireContainer.appendChild(inspireCard)
}

function displayInspires(arr){
    inspireContainer.innerHTML = ``;
    for(let i = 0; i < arr.length; i++){
        createInspireCard(arr[i]);
    }
}

form.addEventListener('submit', submitHandler)

getAllInspires();


// Goal Tarcker JavaScript frontend code 

// goal post data

const goalForm = document.getElementById('goal-form')

goalForm.addEventListener('submit', event => {
    event.preventDefault();
    const goalName = document.getElementById('goal-name').value;
    const goalProgress = document.getElementById('goal-progress').value;

    // Send data to server using Axios
    axios.post('http://localhost:4000/api/goals', {
        name: goalName,
        progress: goalProgress
    })
    .then(function (response) {
        displayGoal(response.data.goal);
    })
    .catch(function (error) {
        console.error(error);
    });
});

// Function to display a goal in the UI

const displayGoal = goal => {
    const goalList = document.getElementById('goal-list');
    const goalItem = document.createElement('tr');
    
    // Populate the table row with goal details
    goalItem.innerHTML = `
        <td>${goal.name}</td>
        <td>${goal.progress}%</td>
        <td><button class="delete-button" data-goal-id="${goal.id}">Delete</button></td>
    `;
    
    goalList.appendChild(goalItem);
}


// Function to send an HTTP DELETE request to delete a goal
const deleteGoal = goalId => {
    axios.delete(`http://localhost:4000/api/goals/${goalId}`)
    .then(function (response) {
        // Remove the deleted goal from the UI
        const deletedGoalElement = document.querySelector(`.delete-button[data-goal-id="${goalId}"]`).closest('tr');
        deletedGoalElement.remove();
    })
    .catch(function (error) {
        console.error(error);
    });
};

// Add event listener to the goal list container to handle delete button clicks
const goalList = document.getElementById('goal-list')
goalList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-button')) {
        const goalId = event.target.getAttribute('data-goal-id');
        deleteGoal(goalId);
    }
});



//  Health Tracker App front end js

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
    const water = document.getElementById('water').value;
    const exercise = document.getElementById('exercise').value;
    const bloodsugerlevel = document.getElementById('bloodsugerlevel').value;

    axios.post('http://localhost:4000/api/healths', {
            water,
            exercise,
            bloodsugerlevel
        })
        .then(function (response) {
            displayHealth(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
});

const displayHealth = health => {
    const healthList = document.getElementById('output');
    const healthItem = document.createElement('tr');
    
    // Populate the table row with goal details
    healthItem.innerHTML = `
        <td>${health.date}</td>
        <td>${health.water}</td>
        <td>${health.exercise}</td>
        <td>${health.bloodsugerlevel}</td>
        <td><button class="editButton">Edit</button></td>
        <td><button class="deleteButton" data-health-id="${health.id}">Delete</button></td>
    `;
    
    healthList.appendChild(healthItem);
}


// Function to send an HTTP DELETE request to delete a health recored

const deleteHealthRecord = recordId => {
    axios.delete(`http://localhost:4000/api/healths/${recordId}`)
    .then(function (response) {
        // Remove the deleted health record from the UI
const deletedHealthElement = document.querySelector(`.deleteButton[data-health-id="${recordId}"]`).closest('tr');
        if (deletedHealthElement) {
            deletedHealthElement.remove();
        } else {
            console.error("Could not find the element to delete.");
        }
    })
    .catch(function (error) {
        console.error(error);
    });
};


// Add event listener to the goal list container to handle delete button clicks

const healthTableBody = document.getElementById('output');
healthTableBody.addEventListener('click', event => {
    if (event.target.classList.contains('deleteButton')) {
        const healthId = event.target.getAttribute('data-health-id');
        deleteHealthRecord(healthId);
    }
});
