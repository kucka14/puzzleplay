const dataDict = JSON.parse(document.getElementById('data_dict').textContent);
console.log(dataDict)

const zipsMean = dataDict['zipsMean'];
const bopsMean = dataDict['bopsMean'];
let winner = 'Bops';
if (zipsMean < bopsMean) {
    winner = 'Zips';
}

const zipsTimes = dataDict['zipsTimes'];
const bopsTimes = dataDict['bopsTimes'];

const zipsTarget = document.querySelector('#zips-times-div-inner');
for (let i = 0; i < zipsTimes.length; i++) {
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `<button data-time="${zipsTimes[i]}" data-name="${'Runner '+(i+1).toString()}" class="time-button">Runner ${i + 1}</button>`;
    zipsTarget.appendChild(buttonDiv);
}

const bopsTarget = document.querySelector('#bops-times-div-inner');
for (let i = 0; i < bopsTimes.length; i++) {
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `<button data-time="${bopsTimes[i]}" data-name="${'Runner '+(i+1).toString()}" class="time-button">Runner ${i + 1}</button>`;
    bopsTarget.appendChild(buttonDiv);
}

const timeButtons = document.getElementsByClassName('time-button');
for (let i = 0; i < timeButtons.length; i++) {
    const timeButton = timeButtons[i];
    const time = timeButton.getAttribute('data-time');
    const name = timeButton.getAttribute('data-name');
    timeButton.onclick = function() {
        if (timeButton.style.color = 'black') {
            timeButton.style.color = 'white';
            timeButton.style.backgroundColor = 'navy';
        }
        if (timeButton.innerHTML[0] == 'R') {
            timeButton.innerHTML = time;
        } else {
            timeButton.innerHTML = name;
        }
    }
}

const zipsChoiceButton = document.querySelector('#zips-choice-button');
const bopsChoiceButton = document.querySelector('#bops-choice-button');
const displayTarget = document.querySelector('#middle-choice-div');

function makeChoice(choice) {
    zipsChoiceButton.style.color = 'white';
    zipsChoiceButton.style.backgroundColor = 'navy';
    zipsChoiceButton.innerHTML = 'Zips: ' + zipsMean;
    bopsChoiceButton.style.color = 'white';
    bopsChoiceButton.style.backgroundColor = 'navy';
    bopsChoiceButton.innerHTML = 'Bops: ' + bopsMean;
    if (choice == winner) {
        displayTarget.innerHTML = 'Correct!';
    } else {
        displayTarget.innerHTML = 'Incorrect.';
    }
}

zipsChoiceButton.onclick = function() {
    if (this.style.color != 'white') {
        makeChoice('Zips');
    }
}

bopsChoiceButton.onclick = function() {
    if (this.style.color != 'white') {
        makeChoice('Bops');
    }
}
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        





