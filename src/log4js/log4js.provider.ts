import { Provider } from "@nestjs/common";
import { LOG4JS_OPTION } from "./log4js.constants";
import { IOption } from "./interface";

export function createOptionProvider(options?: IOption): Provider {
    return {
        provide: LOG4JS_OPTION,
        useFactory: function() {
            return options;
        }
    };
}
