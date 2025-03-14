class Logger {
    constructor() {
        this.info("Logger created sucessfully!");
    }

    info(message) {
        console.log(`${this.#timestamp()} INFO: ${message}`);
    }

    error(message) {
        console.error(`${this.#timestamp()} ERROR: ${message}`);
    }

    warn(message) {
        console.warn(`${this.#timestamp()} WARN: ${message}`);
    }

    debug(message) {
        console.warn(`${this.#timestamp()} DEBUG: ${message}`);
    }
    
    #timestamp() {
        const pad2 = (n) => n < 10 ? '0' + n : n;
        var date = new Date();
        return date.getFullYear().toString() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate()) + 'T' + 
            pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds());
    }
}

const log = new Logger();
export default log;