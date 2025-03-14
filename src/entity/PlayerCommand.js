import { PLAYER_COMMAND_PUT } from "../constants/CommandConstants";

export default class PlayerCommand {
    constructor(command, values) {
        if(typeof playerCommand !== "string" || typeof values !== "object") return
        this.command = command;
        this.values = values;
    }

    commandPut(x, y) {
        this.command = PLAYER_COMMAND_PUT;
        this.values = [x, y];
    }

    getCommand() {
        return {
            command : this.command,
            values : [...this.values]
        };
    }
}