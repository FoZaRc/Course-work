let isPlaying = false;
let currentBeat = 0;
let timeSignatureArray = [];
let currentSignatureIndex = 0;
let intervalId;

const timeSignatureInput = document.getElementById('timeSignature');
const tempoInput = document.getElementById('tempo');
const startStopButton = document.getElementById('startStopButton');
const clickSound = document.getElementById('clickSound');
const beatDisplay = document.getElementById('beatDisplay');

function parseTimeSignatures(input) {
    return input.split(',').map(signature => {
        const [beats, noteValue] = signature.trim().split('/').map(Number);
        return { beats, noteValue };
    });
}

function createBeatDisplay(beats) {
    beatDisplay.innerHTML = '';
    for (let i = 0; i < beats; i++) {
        const beat = document.createElement('div');
        beat.classList.add('beat');
        beatDisplay.appendChild(beat);
    }
}

function updateBeatDisplay(currentBeat) {
    const beats = document.querySelectorAll('.beat');
    beats.forEach((beat, index) => {
        if (index === currentBeat) {
            beat.classList.add('active');
        } else {
            beat.classList.remove('active');
        }
    });
}

function startMetronome() {
    timeSignatureArray = parseTimeSignatures(timeSignatureInput.value);
    currentSignatureIndex = 0;
    currentBeat = 0;
    const tempo = parseInt(tempoInput.value, 10);
    const interval = 60000 / tempo;

    createBeatDisplay(timeSignatureArray[currentSignatureIndex].beats);
    intervalId = setInterval(playClick, interval);
    startStopButton.textContent = 'Stop';
    isPlaying = true;
}

function stopMetronome() {
    clearInterval(intervalId);
    startStopButton.textContent = 'Start';
    isPlaying = false;
}

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();

    updateBeatDisplay(currentBeat);

    const currentSignature = timeSignatureArray[currentSignatureIndex];
    currentBeat++;

    if (currentBeat >= currentSignature.beats) {
        currentBeat = 0;
        currentSignatureIndex = (currentSignatureIndex + 1) % timeSignatureArray.length;
        createBeatDisplay(timeSignatureArray[currentSignatureIndex].beats);
    }
}

startStopButton.addEventListener('click', () => {
    if (isPlaying) {
        stopMetronome();
    } else {
        startMetronome();
    }
});
