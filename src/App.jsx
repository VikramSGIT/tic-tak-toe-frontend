import Player from "./components/Players"

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player playerName="Player 1" playerType="X" />
          <Player playerName="Player 2" playerType="O" />
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  )
}

export default App
