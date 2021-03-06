import { Inject, LoggerService, Injectable } from "@nestjs/common";
import { getLogger, Logger, shutdown, configure } from "log4js";
import { buildConfig } from "./log4js.config";
import { resolve } from "path";
import { IOption } from "./interface";
import { LOG4JS_OPTION } from "../constants/common.constant";

@Injectable()
export class Log4jsService implements LoggerService {
    private loggers: Map<string, Logger>;
    constructor(@Inject(LOG4JS_OPTION) options: IOption) {
        this.loggers = new Map();
        const { env = 'dev', level = "ALL", prefix} = options

        const basePath = env === 'dev' ? resolve(process.cwd(), "./logs") : resolve(`/opt/ihome/logs/${prefix}`)

        const config = buildConfig(level, basePath, prefix);

        configure(config);
    }

    getLogger(loggerName = "APP") {
        let logger = this.loggers.get(loggerName);
        if (!logger) {
            logger = getLogger(loggerName);
            this.loggers.set(loggerName, logger);
        }
        return logger;
    }

    log(message: any, context?: string) {
        this.getLogger(context).info(message);
    }

    error(message: any, trace?: string, context?: string) {
        this.getLogger(context).error(message, trace);
    }

    warn(message: any, context?: string) {
        this.getLogger(context).warn(message);
    }

    debug(message: any, context?: string) {
        this.getLogger(context).debug(message);
    }

    flushall(cb?: () => void) {
        shutdown(() => {
            cb && cb();
        });
    }
}
