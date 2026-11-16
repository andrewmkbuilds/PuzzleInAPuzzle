
const gameStatus = document.getElementById("game-status");
const savedProgress = loadSave();

if (hasProgress()) {
    gameStatus.textContent = `You have completed ${savedProgress.completedLevels.length} puzzles. Continue your adventure!`;
} else {
    gameStatus.textContent = "Your adventure is waiting.";
}
