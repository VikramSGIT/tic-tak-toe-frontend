import { useState } from "react";

const Player = ({playerName, playerType}) => {
    const [isEditing, setIsEditing] = useState(false);

    const updateName = (e) => {
        if(e.key ==  "Enter") {
            e.preventDefault();
            setIsEditing(false);
        }
    }

    const discardName = (e) => {
        setIsEditing(false);
    }
    
    return (
        <span className="player">
            <li onClick= {() => setIsEditing(true)}>
                {!isEditing && <span className="player-name">{playerName}</span> }
                {isEditing && <input autoFocus id={playerName + "-input"} type="text" onKeyUp={updateName} onBlur={discardName} />}
                <span className="player-symbol">{playerType}</span>
            </li>
        </span>
    );
}

export default Player;