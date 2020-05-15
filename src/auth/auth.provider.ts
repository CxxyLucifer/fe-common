import { Provider } from "@nestjs/common";
import { IOption } from "./interface";
import { AUTH_OPTION } from "../constants/common.constant";

export function createOptionProvider(options?: IOption): Provider {
    return {
        provide: AUTH_OPTION,
        useFactory: function() {
            return options;
        }
    };
}
