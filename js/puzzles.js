
const puzzles = [
    {
        id: 1,
        title: "The Missing Pattern",
        type: "number",
        difficulty: "Easy",
        story: "A strange sequence is written on an abandoned terminal. One number is missing.",
        question: "2, 6, 12, 20, 30, ?",
        answer: "42",
        hint: "Look at the difference between each pair of numbers.",
        explanation: "The differences are 4, 6, 8, 10 and 12. The next number is 30 + 12 = 42."
    },
    {
        id: 2,
        title: "The Hidden Message",
        type: "text",
        difficulty: "Medium",
        story: "Someone left a coded message behind. Every letter has been shifted one position forward in the alphabet.",
        question: "Decode this message: DBU",
        answer: "cat",
        hint: "Move every letter one position backwards in the alphabet.",
        explanation: "D becomes C, B becomes A and U becomes T. The hidden message is CAT."
    },
    {
        id: 3,
        title: "The Three Agents",
        type: "choice",
        difficulty: "Hard",
        story: "Three agents are suspects in a security breach. Each makes one statement. Exactly one of the three statements is false.",
        question: "Alex says: 'Blake did it.' Blake says: 'Casey did it.' Casey says: 'Blake did not do it.' Who entered the building?",
        options: ["Alex", "Blake", "Casey"],
        answer: "Casey",
        hint: "Remember that Alex and Casey make opposite claims about Blake. Exactly one of those claims must be false.",
        explanation: "Casey entered. Alex's claim that Blake did it is false. Blake's claim that Casey did it is true. Casey's claim that Blake did not do it is also true. Exactly one statement is false."
    }

];

function getPuzzle(id) {
    return puzzles.find(puzzle => puzzle.id === id);
}

function getTotalPuzzles() {
    return puzzles.length;
}
