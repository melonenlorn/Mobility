
const exercises = [
    { title: "Cat-Cow", duration: 60, desc: "Vierfüßlerstand. Rücken abwechselnd durchhängen und wölben, fließend atmen." },
    { title: "Bird-Dog", duration: 60, desc: "Abwechselnd diagonalen Arm/Bein ausstrecken, Rumpf stabil halten." },
    { title: "T-Spine Rotation – Rechts", duration: 30, desc: "Ellbogen nach oben drehen, Blick folgt. Brustwirbelsäule rotiert nach rechts." },
    { title: "T-Spine Rotation – Links", duration: 30, desc: "Ellbogen nach oben drehen, Blick folgt. Brustwirbelsäule rotiert nach links." },
    { title: "Hip CARs – Rechts vorwärts", duration: 22, desc: "Große, kontrollierte Hüftkreise nach vorne mit dem rechten Bein." },
    { title: "Hip CARs – Rechts rückwärts", duration: 23, desc: "Große, kontrollierte Hüftkreise nach hinten mit dem rechten Bein." },
    { title: "Hip CARs – Links vorwärts", duration: 22, desc: "Große, kontrollierte Hüftkreise nach vorne mit dem linken Bein." },
    { title: "Hip CARs – Links rückwärts", duration: 23, desc: "Große, kontrollierte Hüftkreise nach hinten mit dem linken Bein." },
    { title: "Scapula Push-Up + Down-Dog", duration: 60, desc: "Schulterblätter vor/zurück, dann in den herabschauenden Hund." },
    { title: "Hip Flexor Stretch – Rechts", duration: 30, desc: "Halbkniestand, Becken nach vorn. Dehnung rechts spüren." },
    { title: "Hip Flexor Stretch – Links", duration: 30, desc: "Halbkniestand, Becken nach vorn. Dehnung links spüren." },
    { title: "Shoulder CARs – Rechts vorwärts", duration: 15, desc: "Rechten Arm langsam nach vorne oben kreisen." },
    { title: "Shoulder CARs – Rechts rückwärts", duration: 15, desc: "Rechten Arm langsam rückwärts kreisen." },
    { title: "Shoulder CARs – Links vorwärts", duration: 15, desc: "Linken Arm langsam nach vorne oben kreisen." },
    { title: "Shoulder CARs – Links rückwärts", duration: 15, desc: "Linken Arm langsam rückwärts kreisen." },
    { title: "Band Pull-Aparts", duration: 30, desc: "Band vor der Brust auseinanderziehen, Schulterblätter zusammen." },
    { title: "Overhead Band Stretch", duration: 30, desc: "Band mit gestreckten Armen über den Kopf nach hinten führen." },
    { title: "Deep Squat Hold", duration: 60, desc: "Tiefe Hocke halten, Brust aufrichten. Optional Kettlebell." },
    { title: "Foot Arch Activation", duration: 30, desc: "Fußgewölbe aktiv anheben. Short foot drill." },
    { title: "Neck Mobility + Chin Tucks", duration: 60, desc: "Nackenbewegungen + Doppelkinn halten." }
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

document.getElementById("start-button").addEventListener("click", () => startRoutine());
document.getElementById("stop-button").addEventListener("click", () => stopRoutine());
document.getElementById("next-button").addEventListener("click", () => nextExercise(true));
document.getElementById("back-button").addEventListener("click", () => prevExercise(true));

function startRoutine() {
    if (timer) return;
    loadExercise(current);
    timer = setInterval(updateTimer, 1000);
}

function stopRoutine() {
    clearInterval(timer);
    timer = null;
}

function loadExercise(index) {
    if (index >= exercises.length) {
        stopRoutine();
        document.getElementById("exercise-title").textContent = "Fertig!";
        document.getElementById("exercise-desc").textContent = "Du hast die Routine abgeschlossen.";
        document.getElementById("next-title").textContent = "–";
        numberEl.textContent = "";
        return;
    }

    const exercise = exercises[index];
    document.getElementById("exercise-title").textContent = exercise.title;
    document.getElementById("exercise-desc").textContent = exercise.desc;
    document.getElementById("next-title").textContent = exercises[index + 1] ? exercises[index + 1].title : "–";
    numberEl.textContent = `Übung ${index + 1} von ${exercises.length}`;
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
            totalTimeLeft += (exercises[current].duration - timeLeft);
            elapsed -= (exercises[current].duration - timeLeft);
        }
        current--;
        loadExercise(current);
    }
}
