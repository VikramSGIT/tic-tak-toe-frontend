import PlayerCommand from "../../entity/PlayerCommand";
import { SERVER_BASE_URL, SERVER_SOCKET_ENDPOINT, SOCKET_PLAYER_MESSAGE, SOCKET_RETRY, SOCKET_RETRY_TIMEOUT, SOCKET_STATUS_CODE } from "../../constants/constants";
import log from "../logger";

export class WebSocketClient {
    constructor(callback, setConnected) {
        this.callback = callback;
        this.setConnected = setConnected;

        this.socket = new WebSocket(`${SERVER_BASE_URL}${SERVER_SOCKET_ENDPOINT}`);
        this.socket.onmessage = this.#onMessage
        this.socket.onerror = this.#onError;
        this.socket.onopen = this.#onOpen;
        this.socket.onclose = this.#onClose;
    }

    updateBoard(x, y) {
        const command = new PlayerCommand();
        command.commandPut(x, y);
        this.sendMessage(JSON.stringify(command.getCommand()));
    }

    sendMessage(message) {
        this.socket.send(message);
    }

    #onMessage = (message) => {
        const json = JSON.parse(message.data);1
        if(json[SOCKET_STATUS_CODE] === '499') {
            this.retryEnabled = false;
            log.debug(json[SOCKET_PLAYER_MESSAGE]);
        }
        else if(json[SOCKET_STATUS_CODE] !== '200') {
            this.retryEnabled = false;
            log.error(`Socket Status code: ${json[SOCKET_STATUS_CODE]}. Error message: ${json['message']}`);
            return;
        }
        this.callback(json);
    }

    #onClose = () => {
        this.setConnected(false);
        this.connected = false;
        this.#retry();
    }

    #onOpen = (e) => {
        log.debug(`Websocket opened sucessfully. Connected to ${e.target.url}`);
        this.connected = true;
        this.setConnected(true);
        this.retryEnabled = true;
        this.socket.onmessage = this.#onMessage;
        this.socket.onerror = this.#onError;
        this.socket.onclose = this.#onClose;
    }

    #onError = (err) => {
        log.error(`Error occured in socket connection. ${err}`);
    }

    #retry = () => {
        if(!this.retryEnabled) return;

        let retryCount = SOCKET_RETRY;
        const retryInterval = setInterval(() => {
            log.info(`Socket retry attempt ${SOCKET_RETRY - (retryCount - 1)}`);
            if(this.connected) {
                clearInterval(retryInterval);
                log.info(`Socket reconnected after ${SOCKET_RETRY - (retryCount - 1)} attempts.`);
                return;
            }
            retryCount--;
            this.socket = new WebSocket(`${SERVER_BASE_URL}${SERVER_SOCKET_ENDPOINT}`);

            this.socket.onopen = this.#onOpen;

            if(retryCount <= 0) {
                clearInterval(retryInterval);
                log.error("Socket couldn't be connect to server. Retry attempts exceeded.");
            }
        }, SOCKET_RETRY_TIMEOUT);
    }

    closeSocket() {
        this.socket.close();
    }
};