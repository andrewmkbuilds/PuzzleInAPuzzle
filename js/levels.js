
const levelsGrid = document.getElementById("levels-grid");
const progress = loadSave();

puzzles.forEach(function(puzzle) {
    const completed = progress.completedLevels.includes(puzzle.id);
    const unlocked = puzzle.id <= progress.currentLevel;

    const card = document.createElement(unlocked ? "a" : "article");

    card.className = "level-card";

    if (unlocked) {
        card.href = `game.html?level=${puzzle.id}`;
    } else {
        card.classList.add("locked-card");
    }

    const number = document.createElement("span");
    number.className = "level-number";
    number.textContent = `PUZZLE ${String(puzzle.id).padStart(2, "0")}`;

    const name = document.createElement("h2");
    name.textContent = puzzle.title;

    const details = document.createElement("p");
    details.textContent = `${puzzle.difficulty} difficulty`;

    const status = document.createElement("span");
    status.className = "level-status";

    if (completed) {
        status.textContent = "Completed";
        status.classList.add("completed");
    } else if (unlocked) {
        status.textContent = "Ready to play";
        status.classList.add("available");
    } else {
        status.textContent = "Locked";
        status.classList.add("locked");
    }

    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(details);
    card.appendChild(status);

    levelsGrid.appendChild(card);
});
