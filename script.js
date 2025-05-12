
const exercises = [
    { title: "Cat-Cow", duration: 60, desc: "Spinal waves in tabletop position.", image: "Catcow.png" },
    { title: "Bird-Dog", duration: 60, desc: "Opposite arm and leg lift in tabletop.", image: "Birddog.png" },
    { title: "T-Spine Rotation", duration: 60, desc: "Elbow to sky and under arm in tabletop.", image: "Tspine.png" },
    { title: "Hip CARs", duration: 90, desc: "Controlled hip circles on all fours.", image: "Hipflexor.png" },
    { title: "Scapula Push-Up + Down Dog", duration: 60, desc: "Shoulder protraction + inverted V pose.", image: "Scapuladowndog.png" },
    { title: "Hip Flexor Stretch", duration: 60, desc: "Kneeling lunge, pelvis forward.", image: "Hipflexor.png" },
    { title: "Shoulder CARs", duration: 60, desc: "Controlled arm circles overhead.", image: "Shouldercars.png" },
    { title: "Band Pull-Aparts", duration: 30, desc: "Pull resistance band to chest.", image: "Bandpull.png" },
    { title: "Overhead Band Stretch", duration: 30, desc: "Arms stretch band overhead & back.", image: "Overheadband.png" },
    { title: "Deep Squat Hold", duration: 60, desc: "Sit deep, elbows open knees.", image: "Deepsquat.png" },
    { title: "Foot Arch Activation", duration: 30, desc: "Lift foot arch, spread toes.", image: "Footarch.png" },
    { title: "Neck Mobility + Chin Tucks", duration: 60, desc: "Neck turns + chin retract.", image: "Neck.png" }
];

let current = 0;
let timeLeft = 0;
let timer = null;
let totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);
let totalTimeLeft = totalDuration;
let elapsed = 0;

const audio = document.getElementById("beep");
const timerEl = document.getElementById("timer");
const totalEl = document.getElementById("total-time");
const progressEl = document.getElementById("progress");
const numberEl = document.getElementById("exercise-number");
const iconEl = document.getElementById("exercise-icon");

const startBtn = document.getElementById("start-button");
const restartBtn = document.getElementById("restart-button");

startBtn.addEventListener("click", togglePlayPause);
restartBtn.addEventListener("click", restartRoutine);
document.getElementById("next-button").addEventListener("click", () => nextExercise(true));
document.getElementById("back-button").addEventListener("click", () => prevExercise(true));

function togglePlayPause() {
    if (timer) {
        stopRoutine();
    } else {
        startRoutine();
    }
    updatePlayPauseIcon();
}

function startRoutine() {
    if (!timer) {
        loadExercise(current);
        timer = setInterval(updateTimer, 1000);
        updatePlayPauseIcon();
    }
}

function stopRoutine() {
    clearInterval(timer);
    timer = null;
    updatePlayPauseIcon();
}

function restartRoutine() {
    stopRoutine();
    current = 0;
    elapsed = 0;
    totalTimeLeft = totalDuration;
    loadExercise(current);
}

function loadExercise(index) {
    if (index >= exercises.length) {
        stopRoutine();
        document.getElementById("exercise-title").textContent = "Well done!";
        document.getElementById("exercise-desc").textContent = "You finished the routine.";
        document.getElementById("next-title").textContent = "–";
        numberEl.textContent = "";
        iconEl.src = "";
        return;
    }

    const exercise = exercises[index];
    document.getElementById("exercise-title").textContent = exercise.title;
    document.getElementById("exercise-desc").textContent = exercise.desc;
    document.getElementById("next-title").textContent = exercises[index + 1] ? exercises[index + 1].title : "–";
    numberEl.textContent = `Exercise ${index + 1} of ${exercises.length}`;
    iconEl.src = "./" + exercise.image;
    timeLeft = exercise.duration;
    updateTimerDisplay();
    audio.play();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        totalTimeLeft--;
        elapsed++;
        updateTimerDisplay();
    } else {
        current++;
        loadExercise(current);
    }
}

function updateTimerDisplay() {
    timerEl.textContent = formatTime(timeLeft);
    totalEl.textContent = `/ ${formatTime(totalTimeLeft)}`;
    progressEl.style.width = `${(elapsed / totalDuration) * 100}%`;
}

function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function nextExercise(manual = false) {
    if (current < exercises.length - 1) {
        if (manual) {
            elapsed += timeLeft;
            totalTimeLeft -= timeLeft;
        }
        current++;
        loadExercise(current);
    }
}

function prevExercise(manual = false) {
    if (current > 0) {
        if (manual) {
            elapsed -= exercises[current - 1].duration;
            totalTimeLeft += exercises[current - 1].duration;
        }
        current--;
        stopRoutine();
        loadExercise(current);
    }
}

function updatePlayPauseIcon() {
    startBtn.textContent = timer ? "⏸" : "▶";
}
