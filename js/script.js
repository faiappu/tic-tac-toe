document.addEventListener('DOMContentLoaded', () => {
    const TicTacToe = (function() {
        function createBoard() {
            const board = Array(9).fill(null); // Initialize a 3x3 grid (9 cells)
            let currentMark = 'X'; // Track the current player's mark

            const renderBoard = () => {
                const boardElement = document.getElementById('board');
                boardElement.innerHTML = ''; // Clear the existing board

                board.forEach((cell, index) => {
                    const cellElement = document.createElement('div');
                    cellElement.classList.add('item');
                    cellElement.textContent = cell ? cell : ''; // Set the cell content
                    cellElement.addEventListener('click', () => {
                        makeMove(index);
                    });
                    boardElement.appendChild(cellElement);
                });
            };

            const makeMove = (position) => {
                if (board[position] === null) { // Check if the position is empty
                    board[position] = currentMark; // Place the player's mark
                    currentMark = currentMark === 'X' ? 'O' : 'X'; // Switch players
                    renderBoard(); // Update the board display
                    checkWin(); // Check for a win or draw
                } else {
                    console.log("Position already taken!");
                }
            };

            const checkWin = () => {
                const winningCombinations = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
                    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
                    [0, 4, 8], [2, 4, 6]  // Diagonal
                ];

                for (const combination of winningCombinations) {
                    const [a, b, c] = combination;
                    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                        alert(`Player ${board[a]} wins!`);
                        resetBoard();
                        return;
                    }
                }

                if (board.every(cell => cell !== null)) {
                    alert("It's a draw!");
                    resetBoard();
                }
            };

            const resetBoard = () => {
                for (let i = 0; i < board.length; i++) {
                    board[i] = null; // Reset all cells to null
                }
                currentMark = 'X'; // Reset current player
                renderBoard(); // Render the board after resetting
            };

            // Initial render
            renderBoard();

            return {
                makeMove,
                resetBoard
            };
        }

        const gameBoard = createBoard(); // Create a game board instance

        // Event listener for the reset button
        document.getElementById('reset').addEventListener('click', () => {
            gameBoard.resetBoard(); // Reset the game when the button is clicked
        });

        return {
            gameBoard // Expose the game board instance
        };
    })();
});