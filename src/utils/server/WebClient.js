import { SERVER_BASE_URL } from "../../constants/constants";
import log from "../logger";
import { RequestType } from "./RequestType";

const request = async (endpoint, method, data = '', headers = {}) => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/text',
            ...headers
        },
        credentials: 'include',
       body: data
    }

    log.debug(`Request Type: ${method} Endpoint: ${SERVER_BASE_URL}${endpoint} Payload: ${data}`);
    return await fetch(`${SERVER_BASE_URL}${endpoint}`, config);
}

export const relogin = () => request('/relogin', RequestType.POST);
export const login = (playerName) => request('/login', RequestType.POST, playerName);
export const getAllPlayers = () => request('/players', RequestType.GET);
export const getPlayer = (playerId) => request(`/players/${playerId}`, RequestType.GET);
export const updatePlayer = (playerName) => request('/players', RequestType.PUT, playerName);