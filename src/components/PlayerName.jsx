import { useState } from "react";
import { validateName } from "../utils/CommonUtils";
import { updatePlayer } from "../utils/server/WebClient";

const PlayerName = ({name, setName}) => {

    const updateName = async (e) => {
        if(e.key ===  "Enter") {
            e.preventDefault();
            if(validateName(e.target.value)) {
                const response = await updatePlayer(e.target.value);
                if(response != null && response.ok) {
                    const res = await response.json();
                    setName(() => res['name']);
                    setIsEditing(state => !state);
                }
            }
        }
    }
    const discardName = (e) => {
        setIsEditing(() => false);
    }
    const onClick = () => setIsEditing(() => true)
    const [isEditing, setIsEditing] = useState(false);
    
    return (
        <div  onClick={onClick} className="player">
            {!isEditing && <span className="player-name">{name}</span> }
            {isEditing && <input autoFocus id="player_name" type="text" onKeyDown={updateName} onBlur={discardName} defaultValue={name} />}
        </div>
    );
}

export default PlayerName;