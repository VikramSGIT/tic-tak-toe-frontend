import { PLAYER1, PLAYER2 } from "../constants/constants";

const GameBoard = ({ onSelectSquare, activePlayer, gameBoard }) => {
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => 
                            <li key={colIndex}>
                                <button
                                    disabled={playerSymbol != null || !activePlayer}
                                    className={playerSymbol != null || !activePlayer ? 'disabled' : null}
                                    onClick={() => onSelectSquare(rowIndex, colIndex)}>
                                        {playerSymbol === PLAYER1 ? 'X' : playerSymbol === PLAYER2 ? 'O' : null}
                                </button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    );
}

export default GameBoard;