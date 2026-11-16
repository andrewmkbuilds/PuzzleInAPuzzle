
const title = document.getElementById("puzzle-title");
const story = document.getElementById("puzzle-story");
const question = document.getElementById("puzzle-question");
const difficulty = document.getElementById("difficulty");
const levelNumber = document.getElementById("level-number");
const progressFill = document.getElementById("progress-fill");
const answerArea = document.getElementById("answer-area");
const submitButton = document.getElementById("submit-answer");
const hintButton = document.getElementById("hint-button");
const feedback = document.getElementById("feedback");
const hintText = document.getElementById("hint-text");

let saveData = loadSave();

const requestedLevel = Number(
    new URLSearchParams(window.location.search).get("level")
) || saveData.currentLevel;

let currentPuzzle = getPuzzle(requestedLevel);

if (
    requestedLevel < 1 ||
    requestedLevel > saveData.currentLevel ||
    (!currentPuzzle && requestedLevel !== getTotalPuzzles() + 1)
) {
    window.location.href = "levels.html";
}
let selectedAnswer = "";

function showPuzzle() {
    if (!currentPuzzle) {
        showGameComplete();
        return;
    }

    title.textContent = currentPuzzle.title;
    story.textContent = currentPuzzle.story;
    question.textContent = currentPuzzle.question;
    difficulty.textContent = currentPuzzle.difficulty.toUpperCase();
    levelNumber.textContent = `LEVEL ${String(currentPuzzle.id).padStart(2, "0")}`;

    const completedCount = saveData.completedLevels.length;
    progressFill.style.width = `${(completedCount / getTotalPuzzles()) * 100}%`;

    if (currentPuzzle.type === "choice") {
        showChoices();
    } else {
        showInput();
    }

    
    if (saveData.completedLevels.includes(currentPuzzle.id)) {
        answerArea.innerHTML = "";
        hintButton.disabled = true;
        hintButton.style.display = "none";

        feedback.textContent = "You have already solved this puzzle.";
        feedback.className = "feedback success";

        hintText.textContent = "";
        submitButton.textContent = "Next puzzle";
    } else {
        hintButton.style.display = "inline-flex";
        hintButton.disabled = Boolean(saveData.hintsUsed[currentPuzzle.id]);
    }
}


function showInput() {
    const input = document.createElement("input");

    input.type = "text";
    input.id = "answer-input";
    input.placeholder = "Enter your answer...";
    input.autocomplete = "off";

    answerArea.appendChild(input);

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
}

function showChoices() {
    const choices = document.createElement("div");

    choices.className = "choice-list";

    currentPuzzle.options.forEach(function(option) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "choice-button";
        button.textContent = option;

        button.addEventListener("click", function() {
            selectedAnswer = option;

            document.querySelectorAll(".choice-button").forEach(function(choice) {
                choice.classList.remove("selected");
            });

            button.classList.add("selected");
        });

        choices.appendChild(button);
    });

    answerArea.appendChild(choices);
}


function checkAnswer() {
    if (!currentPuzzle) {
        return;
    }

    if (saveData.completedLevels.includes(currentPuzzle.id)) {
        goToNextPuzzle();
        return;
    }

    let answer = selectedAnswer;

    if (currentPuzzle.type !== "choice") {
        const input = document.getElementById("answer-input");
        answer = input.value.trim();
    }

    if (!answer) {
        feedback.textContent = "Enter an answer first.";
        feedback.className = "feedback error";
        return;
    }

    const correctAnswer = currentPuzzle.answer.toLowerCase().trim();
    const playerAnswer = answer.toLowerCase().trim();

    if (playerAnswer === correctAnswer) {
        completePuzzle();
    } else {
        feedback.textContent = "Not quite. Take another look.";
        feedback.className = "feedback error";
    }
}


function completePuzzle() {
    saveData.completedLevels.push(currentPuzzle.id);
    saveData.currentLevel = currentPuzzle.id + 1;

    saveProgress(saveData);

    feedback.textContent = "Correct! You've solved the puzzle.";
    feedback.className = "feedback success";

    submitButton.textContent = "Next puzzle";
    hintButton.disabled = true;

    if (saveData.currentLevel > getTotalPuzzles()) {
        submitButton.textContent = "Finish game";
    }
}

function showHint() {
    if (saveData.completedLevels.includes(currentPuzzle.id)) {
        return;
    }

    if (!useHint(currentPuzzle.id)) {
        hintText.textContent = "You've already used your hint for this puzzle.";
        return;
    }

    hintText.textContent = currentPuzzle.hint;
    hintButton.disabled = true;
}

function goToNextPuzzle() {
    const nextLevel = currentPuzzle.id + 1;

    if (nextLevel > getTotalPuzzles()) {
        window.location.href = "game.html";
        return;
    }

    window.location.href = `game.html?level=${nextLevel}`;
}



function showGameComplete() {
    title.textContent = "You've solved everything!";
    story.textContent = "Every mystery has been uncovered. Your journey is complete.";
    question.textContent = "All puzzles completed.";
    difficulty.textContent = "GAME COMPLETE";
    levelNumber.textContent = "FINISHED";
    progressFill.style.width = "100%";

    answerArea.innerHTML = "";
    feedback.textContent = "";
    hintText.textContent = "";

    submitButton.textContent = "Back to home";
    hintButton.style.display = "none";

    submitButton.onclick = function() {
        window.location.href = "index.html";
    };
}


submitButton.addEventListener("click", function() {
    checkAnswer();
});

hintButton.addEventListener("click", function() {
    showHint();
});

showPuzzle();
