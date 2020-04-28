import { Configuration } from "log4js";
import { resolve, join } from "path";

export function buildConfig(level: string, path: string, prefix: string): Configuration {
    return {
        appenders: {
            logToErrorFile: {
                type: "dateFile",
                filename: join(path, `${prefix}-err`),
                alwaysIncludePattern: true,
                pattern: "yyyy-MM-dd.log",
                daysToKeep: 0
            },
            errorLogger: {
                type: "logLevelFilter",
                appender: "logToErrorFile",
                level: "error"
            },
            appLogger: {
                type: "dateFile",
                filename: join(path, `${prefix}-all`),
                alwaysIncludePattern: true,
                pattern: "yyyy-MM-dd.log",
                daysToKeep: 0
            },
            consoleLogger: {
                type: "console",
                layout: {
                    type: "colored"
                }
            }
        },
        categories: {
            default: {
                appenders: ["consoleLogger", "appLogger", "errorLogger"],
                level: level
            }
        }
    };
}
