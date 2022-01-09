
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
        document.querySelector('#count-region').innerHTML = count;
        const correctText = localStorage.getItem('correctText');
        document.querySelector('#correct-region').innerHTML = correctText;
    }
    return count;
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
piInput.addEventListener('keydown', function(e) {
    e.preventDefault();
    if ('0123456789'.includes(e.key)) {
        piInput.value += e.key;
        if (e.key == piText[count]) {
            count += 1;
            document.querySelector('#count-region').innerHTML = count;
            if (piInput.value.length == 6) {
                const addition = piInput.value + '<br>';
                correctRegion.innerHTML += addition;
                piInput.value = '';
                saveSession(count);
                scrollToBottom();
            }
        } else {
            piInput.disabled = true;
            piInput.style.color = 'red';
            setTimeout(function() {
                piInput.value = piInput.value.slice(0, -1);
                piInput.disabled = false;
                piInput.style.color = 'green';
            }, 1000);
        }
    }
});

document.querySelector('#reset-enter').onclick = function() {
    this.style.display = 'none';
    document.querySelector('#reset-confirm-div').style.display = 'block';
}

function exitReset(ownObject) {
    ownObject.parentElement.style.display = 'none';
    document.querySelector('#reset-enter').style.display = 'block';
}

document.querySelector('#reset-quit').onclick = function() {
    exitReset(this);
}

document.querySelector('#reset-confirm').onclick = function() {
    count = 0;
    document.querySelector('#count-region').innerHTML = count;
    document.querySelector('#correct-region').innerHTML = '';
    piInput.value = '';
    saveSession(count);
    exitReset(this);
}











