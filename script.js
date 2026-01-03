let currentInput = "0";
let history = [];
const displayDiv = document.getElementById('display');
const historyList = document.getElementById('history-list');
const clickSound = document.getElementById('click-audio');
const successSound = document.getElementById('success-audio');
const menu = document.getElementById('dropdown-menu');

function playFeedback() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    if (navigator.vibrate) navigator.vibrate(15);
}

function toggleMenu() {
    playFeedback();
    menu.classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.matches('#menu-btn')) {
        if (menu.classList.contains('show')) menu.classList.remove('show');
    }
}

function append(value) {
    playFeedback();
    if (currentInput === "0" && value !== ".") {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function calculate() {
    try {
        let result = eval(currentInput);
        
        // Success Feedback
        successSound.currentTime = 0;
        successSound.play().catch(() => {});
        
        // Confetti Effect
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#60d2e8', '#93ff52', '#fceb53', '#d15f5f']
        });

        history.unshift(`${currentInput} = ${result}`);
        if (history.length > 10) history.pop();
        renderHistory();
        
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        playFeedback();
        currentInput = "Error";
        updateDisplay();
    }
}

function copyResult() {
    playFeedback();
    navigator.clipboard.writeText(currentInput).then(() => {
        // Visual feedback for copying
        displayDiv.classList.add('copy-flash');
        setTimeout(() => displayDiv.classList.remove('copy-flash'), 500);
        alert("Result copied to clipboard!");
    });
}

function allClear() {
    playFeedback();
    currentInput = "0";
    updateDisplay();
}

function clearLast() {
    playFeedback();
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    updateDisplay();
}

function updateDisplay() {
    displayDiv.innerText = currentInput;
}

function renderHistory() {
    historyList.innerHTML = history.length > 0 
        ? history.map(item => `<li>${item}</li>`).join('')
        : "<li>No history yet</li>";
}

function clearHistory() {
    playFeedback();
    history = [];
    renderHistory();
}

function toggleTheme() {
    playFeedback();
    const body = document.body;
    const text = document.getElementById('theme-toggle-text');
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        text.innerText = "☀️ Light Mode";
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        text.innerText = "🌙 Dark Mode";
    }
}
const errorSound = document.getElementById('error-audio');
const calculatorEl = document.querySelector('.calculator');

function calculate() {
    try {
        // Evaluate the result
        let result = eval(currentInput);
        
        // If eval returns undefined or NaN (like 0/0)
        if (result === undefined || isNaN(result)) throw new Error();

        // SUCCESS EFFECT
        successSound.currentTime = 0;
        successSound.play().catch(() => {});
        
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#60d2e8', '#93ff52', '#fceb53']
        });

        history.unshift(`${currentInput} = ${result}`);
        if (history.length > 10) history.pop();
        renderHistory();
        
        currentInput = result.toString();
        displayDiv.classList.remove('error-text');
    } catch (e) {
        // ERROR EXPLOSION EFFECT
        errorSound.currentTime = 0;
        errorSound.play().catch(() => {});

        // Screen Shake
        calculatorEl.classList.add('shake');
        displayDiv.classList.add('error-text');
        setTimeout(() => calculatorEl.classList.remove('shake'), 400);

        // Explosion Confetti (Heavy particles falling fast)
        confetti({
            particleCount: 80,
            startVelocity: 45,
            spread: 360,
            ticks: 60,
            origin: { y: 0.3 },
            colors: ['#000000', '#ff0000', '#444444'], // Ash and fire colors
            shapes: ['square']
        });

        currentInput = "Error";
    }
    updateDisplay();
}
