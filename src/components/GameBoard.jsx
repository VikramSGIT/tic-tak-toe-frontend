import { PLAYER1 } from "../constants";

const GameBoard = ({ onSelectSquare, activePlayer, gameBoard, setGameBoard }) => {
    const updateGameBoard = (row, col) => setGameBoard(prevGameBoard => {
        onSelectSquare()
        const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
        updatedGameBoard[row][col] = activePlayer === PLAYER1 ? 'X' : 'O';
        return updatedGameBoard;
    });
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerType, colIndex) => 
                            <li key={colIndex}>
                                <button onClick={() => updateGameBoard(rowIndex, colIndex)}>{playerType}</button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    );
}

export default GameBoard;