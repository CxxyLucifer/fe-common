import { Logger, QueryRunner } from "typeorm";
import { Injectable } from "@nestjs/common";

import { Log4jsService } from '../log4js/log4js.service';

@Injectable()
export class TypeOrmLogger implements Logger {
    constructor(
        private readonly log4js: Log4jsService
    ){}

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.log4js.log(`logQuery:${query} parameters:${parameters}`,'typeOrm')
    }
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.log4js.error(`logQueryError:${query} parameters:${parameters} error:${error}`,'','typeOrm')
    }
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.log4js.warn(`logQuerySlow:${query} parameters:${parameters} costTime:${time}ms`,'typeOrm')
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {}
    logMigration(message: string, queryRunner?: QueryRunner) {}
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
        switch (level) {
            case "log":
            case "info":
                this.log4js.log(`${message}`,'typeOrm')
                break;
            case "warn":
                this.log4js.warn(`${message}`,'typeOrm')
                break;
          }
    }
}