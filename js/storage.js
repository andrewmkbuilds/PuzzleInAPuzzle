
const saveKey = "puzzleinapuzzle_save";

function getDefaultSave() {
    return {
        currentLevel: 1,
        completedLevels: [],
        hintsUsed: {}
    };
}

function loadSave() {
    const savedData = localStorage.getItem(saveKey);

    if (!savedData) {
        return getDefaultSave();
    }

    try {
        const data = JSON.parse(savedData);

        return {
            currentLevel: Number(data.currentLevel) || 1,
            completedLevels: Array.isArray(data.completedLevels)
                ? data.completedLevels
                : [],
            hintsUsed: typeof data.hintsUsed === "object" && data.hintsUsed !== null
                ? data.hintsUsed
                : {}
        };
    } catch {
        return getDefaultSave();
    }
}

function saveProgress(data) {
    localStorage.setItem(saveKey, JSON.stringify(data));
}

function resetProgress() {
    localStorage.removeItem(saveKey);
}

function hasProgress() {
    const progress = loadSave();

    return progress.completedLevels.length > 0 ||
        progress.currentLevel > 1;
}

function useHint(levelId) {
    const progress = loadSave();

    if (!progress.hintsUsed[levelId]) {
        progress.hintsUsed[levelId] = 0;
    }

    if (progress.hintsUsed[levelId] >= 1) {
        return false;
    }

    progress.hintsUsed[levelId]++;
    saveProgress(progress);

    return true;
}
