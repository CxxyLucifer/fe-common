import { Provider } from "@nestjs/common";
import { LOG4JS_OPTION } from "../constants/common.constant";
import { IOption } from "./interface";

export function createOptionProvider(options?: IOption): Provider {
    return {
        provide: LOG4JS_OPTION,
        useFactory: function() {
            return options;
        }
    };
}
