/**
 * @File: logRecord.js
 * @Author: 夏花
 * @Date: 2023-09-20
 */

import winston from 'winston';
import { format, inspect } from 'util';

class Logger {
    constructor(config = {}) {
        const { level = 'info' } = config;

        this.logger = winston.createLogger({
            level,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.colorize(),
                winston.format.printf(
                    (info) =>
                        `[${info.timestamp}]-[${info.level}]: ${info.message}`
                )
            ),
            transports: [new winston.transports.Console()],
        });
    }

    formatLog(data) {
        return format(
            ...data.map((item) => {
                if (typeof item === 'object' && item !== null) {
                    return inspect(item, { depth: null });
                }
                return item;
            })
        );
    }

    log(level, data) {
        const formattedLog = this.formatLog(data);
        this.logger[level](formattedLog);
    }

    info(...data) {
        this.log('info', data);
    }

    warn(...data) {
        this.log('warn', data);
    }

    error(...data) {
        this.log('error', data);
    }
}

export default new Logger();
