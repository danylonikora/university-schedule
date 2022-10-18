import pino from "pino";

const log = pino({ transport: { target: "pino-pretty" } });

export default log;
