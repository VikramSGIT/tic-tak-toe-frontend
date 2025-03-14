import { PLAYER_NAME_REGEX } from "../constants/constants"

export const validateName = (name) => PLAYER_NAME_REGEX.test(name);