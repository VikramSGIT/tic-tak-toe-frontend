import Player from "./components/Players"
import GameBoard from "./components/GameBoard"
import { useEffect, useState } from "react"
import PlayerName from "./components/PlayerName";
import LoginBanner from "./components/LoginBanner";
import { WebSocketClient } from "./utils/server/WebSocketClient";
import { GAME_BOARD, PLAYER1, PLAYER1_NAME, PLAYER2, PLAYER2_NAME, PLAYER_DATA, PLAYER_OFFLINE, PLAYER_OFFLINE_STRING, PLAYER_TYPE, SOCKET_PLAYER_MESSAGE, VIEWER } from "./constants";
import log from "./utils/logger";

function App() {

  const intialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const [gameBoard, setGameBoard] = useState(intialGameBoard);

  const [connected, setConnected] = useState(false);

  const [activePlayer, setActivePlayer] = useState(PLAYER1);
  const handleSelectSquare = () => {
    setActivePlayer((playerType) => playerType === PLAYER1 ? PLAYER2 : PLAYER1);
  }

  const [name, setName] = useState("nickname");

  const [namePlayer1, setNamePlayer1] = useState("Player 1");
  const [namePlayer2, setNamePlayer2] = useState("Player 2");

  const [showLogin, setShowLogin] = useState(true);
  const [playerType, setPlayerType] = useState(VIEWER);

  useEffect(() => {
    if(playerType === PLAYER1) {
      setName(() => namePlayer1);
    } else if(playerType === PLAYER2) {
      setName(() => namePlayer2);
    }
  }, [namePlayer1, namePlayer2])

  const initWebSocket = () => {
    new WebSocketClient((data) => {
      if(data[SOCKET_PLAYER_MESSAGE]) {
        if(data[SOCKET_PLAYER_MESSAGE][PLAYER_DATA]) {
          const value = data[SOCKET_PLAYER_MESSAGE][PLAYER_DATA];
          setNamePlayer1(() => value[PLAYER1_NAME] != PLAYER_OFFLINE ? value[PLAYER1_NAME] : PLAYER_OFFLINE_STRING);
          setNamePlayer2(() => value[PLAYER2_NAME] != PLAYER_OFFLINE ? value[PLAYER2_NAME] : PLAYER_OFFLINE_STRING);
          log.debug(`Updated player1: ${value[PLAYER1_NAME]} and player2: ${value[PLAYER2_NAME]}`);
        } else if (data[SOCKET_PLAYER_MESSAGE][GAME_BOARD]) {
          setGameBoard(() => data[SOCKET_PLAYER_MESSAGE][GAME_BOARD]);
          log.debug(`Updated game Board: ${data[SOCKET_PLAYER_MESSAGE][GAME_BOARD]}`);
        } else if(data[SOCKET_PLAYER_MESSAGE][PLAYER_TYPE]) {
          setPlayerType(() => data[SOCKET_PLAYER_MESSAGE][PLAYER_TYPE]);
          log.debug(`Updated player type: ${data[SOCKET_PLAYER_MESSAGE][PLAYER_TYPE]}`);
        }
      }
    }, setConnected);
  }

  return (
    <main>
      {showLogin ? <LoginBanner setPlayerName={setName} setShowLogin={setShowLogin} initWebSocket={initWebSocket}/> :
      <section className="container">
        <div className="left-half">
          <div>
            <h2>Tic Tac Toe</h2>
            <h1>Welcome!</h1>
          </div>
          <PlayerName name={name} setName={setName}/>
          <img src="game-logo.png" />
        </div>
        <div className="right-half">
          <div id="game-container">
            <ol id="players" className="highlight-player">
              <Player playerName={namePlayer1} playerType="X" isActive={activePlayer === PLAYER1} name={namePlayer1}/>
              <Player playerName={namePlayer2} playerType="O" isActive={activePlayer === PLAYER2} name={namePlayer2}/>
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} activePlayer={activePlayer} gameBoard={gameBoard} setGameBoard={setGameBoard} />
          </div>
        </div>
      </section>
    }
    </main>
  )
}

export default App
