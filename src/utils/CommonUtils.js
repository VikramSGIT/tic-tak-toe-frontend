import { PLAYER_NAME_REGEX } from "../constants"

export const validateName = (name) => PLAYER_NAME_REGEX.test(name);