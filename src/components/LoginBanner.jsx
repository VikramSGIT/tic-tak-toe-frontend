import { useEffect } from "react";
import { PLAYER_NAME_REGEX } from "../constants";
import log from "../utils/logger";
import { login, relogin } from "../utils/server/WebClient";

const LoginBanner = ({setPlayerName, setShowLogin, initWebSocket}) => {

    const onEnter = async (e) => {
        if(e.key === 'Enter') {
            log.debug(`Typed name ${e.target.value}`);
            
            e.preventDefault();
            const val = e.target.value;

            if(PLAYER_NAME_REGEX.test(val)) {
                const response = await login(e.target.value);

                if(response.ok) {
                    const val = await response.json();
                    setPlayerName(() => val['name']);
                    setShowLogin(() => false);
                    initWebSocket();
                }
                else {
                    log.error(`Login failed. ${response.status}`);
                }
            } else {
                log.error("Invalid player name entered.")
            }
        }
    }

    useEffect(() => {
        relogin().then((response) => {
            if(response.ok) {
                response.json().then((json) => {
                    setPlayerName(() => json['name']);
                    setShowLogin(() => false);
                    initWebSocket();
                });
            } else {
                log.debug("Relogin failed.")
            }
        });
    }, []);

    return (
        <div className="login-banner">
            <h2>Enter a nickname</h2>
            <input type="text" placeholder="Enter nickname" onKeyUp={onEnter}/>
            <span>Hit ↵ Enter to proceed</span>
        </div>
    )
};

export default LoginBanner;