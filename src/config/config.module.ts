import { Global, Module, DynamicModule } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { createConfigOptionProvider } from "./config.provider";
import { IOption } from "./interface";

@Module({
    providers: [ConfigService, createConfigOptionProvider()],
    exports: [ConfigService]
})
export class ConfigModule {
    static forRoot(options: IOption): DynamicModule {
        const optionProvider = createConfigOptionProvider(options);
        return {
            module: ConfigModule,
            providers: [ConfigService, optionProvider],
            exports: [ConfigService]
        };
    }
}

@Global()
@Module({
    providers: [ConfigService, createConfigOptionProvider()],
    exports: [ConfigService]
})
export class ConfigGlobalModule {
    static forRoot(options: IOption): DynamicModule {
        const optionProvider = createConfigOptionProvider(options);
        return {
            module: ConfigModule,
            providers: [ConfigService, optionProvider],
            exports: [ConfigService]
        };
    }
}