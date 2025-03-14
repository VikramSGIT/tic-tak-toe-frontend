
const Player = ({playerType, isActive, name}) => {
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                <span className="player-name">{name}</span>
                <span className="player-symbol">{playerType}</span>
            </span>
        </li>
    );
}

export default Player;