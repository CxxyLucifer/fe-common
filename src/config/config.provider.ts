import { Provider } from "@nestjs/common";
import { IOption } from "./interface";
import { CONFIG_OPTION } from "../constants/common.constant";

export function createConfigOptionProvider(options?: IOption): Provider {
    return {
        provide: CONFIG_OPTION,
        useFactory: function() {
            return options;
        }
    };
}
