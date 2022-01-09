
function saveSession(count) {
    localStorage.setItem('count', count);
    const correctText = document.querySelector('#correct-region').innerHTML;
    localStorage.setItem('correctText', correctText);
}

function restoreSession() {
    let count = localStorage.getItem('count');
    if (count == null) {
        count = 0;
    } else {
        count = parseInt(count);
        document.querySelector('#counter').innerHTML = count;
        const correctText = localStorage.getItem('correctText');
        document.querySelector('#correct-region').innerHTML = correctText;
        document.querySelector('#counter').style.display = 'block';
        document.querySelector('#reset-enter').style.display = 'inline-block';
        document.querySelector('#main-panel').style.display = 'block';
        document.querySelector('#enter-count-div').style.display = 'none';
    }
    return count;
}

document.querySelector('#enter-count').onclick = function() {
    let inValue = document.querySelector('#input-count').value;
    inValue = parseInt(inValue);
    if (!isNaN(inValue)) {
        let goValue = Math.floor(inValue/6) * 6;
        enterOff();
        count = goValue;
        document.querySelector('#counter').innerHTML = count;
        saveSession(count);
    }
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

setTimeout(function() {
    scrollToBottom();
});
const piText = JSON.parse(document.getElementById('pi_text').textContent);
let count = restoreSession();
const correctRegion = document.querySelector('#correct-region');
const piInput = document.querySelector('#pi-input');
let currentInput = '';

function incorrectEntry() {
    piInput.disabled = true;
    piInput.style.color = 'red';
    setTimeout(function() {
        piInput.value = currentInput;
        piInput.disabled = false;
        piInput.style.color = 'green';
    }, 1000);
}

piInput.oninput = function() {
    if (this.value.length == currentInput.length + 1) {
        if (this.value.slice(-1) == piText[count]) {
            count += 1;
            document.querySelector('#counter').innerHTML = count;
            if (piInput.value.length == 6) {
                const addition = piInput.value + '<br>';
                correctRegion.innerHTML += addition;
                piInput.value = '';
                saveSession(count);
                scrollToBottom();
            }
            currentInput = this.value;
        } else {
            incorrectEntry();
        } 
    } else {
        incorrectEntry();
    }
}

document.querySelector('#reset-enter').onclick = function() {
    this.style.display = 'none';
    document.querySelector('#reset-confirm-div').style.display = 'block';
}

document.querySelector('#reset-quit').onclick = function() {
    this.parentElement.style.display = 'none';
    document.querySelector('#reset-enter').style.display = 'block';
}

document.querySelector('#reset-confirm').onclick = function() {
    count = 0;
    document.querySelector('#counter').style.display = 'none';
    document.querySelector('#reset-enter').style.display = 'none';
    document.querySelector('#reset-confirm-div').style.display = 'none';
    document.querySelector('#main-panel').style.display = 'none';
    document.querySelector('#enter-count-div').style.display = 'block';
    document.querySelector('#correct-region').innerHTML = '';
    piInput.value = '';
    currentInput = '';
    saveSession(count);
}











