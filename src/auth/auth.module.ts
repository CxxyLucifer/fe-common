import { Global, Module, DynamicModule } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { createOptionProvider } from "./auth.provider";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { IOption } from "./interface";
import { 
    COMMON_SECRETKEY, 
    COMMON_DEFAULT_SGY, 
    COMMON_EXPIREIN 
} from "../constants/common.constant";

@Module({
    imports:[
        JwtModule.register({
            privateKey: COMMON_SECRETKEY,
            signOptions: {
                expiresIn: COMMON_EXPIREIN,
            },
        }),
        PassportModule.register({defaultStrategy: COMMON_DEFAULT_SGY})
    ],
    providers: [AuthService, JwtStrategy,createOptionProvider()],
    exports: [AuthService, JwtStrategy]
})
export class AuthModule {
    static forRoot(options: IOption): DynamicModule {
        const optionProvider = createOptionProvider(options);
        return {
            imports:[
                JwtModule.register({
                    privateKey: COMMON_SECRETKEY,
                    signOptions: {
                        expiresIn: COMMON_EXPIREIN,
                    },
                }),
                PassportModule.register({defaultStrategy: COMMON_DEFAULT_SGY})
            ],
            module: AuthModule,
            providers: [AuthService, JwtStrategy, optionProvider],
            exports: [AuthService, JwtStrategy]
        };
    }
}

@Global()
@Module({
    imports:[
        JwtModule.register({
            privateKey: COMMON_SECRETKEY,
            signOptions: {
                expiresIn: COMMON_EXPIREIN,
            },
        }),
        PassportModule.register({defaultStrategy: COMMON_DEFAULT_SGY})
    ],
    providers: [AuthService,JwtStrategy, createOptionProvider()],
    exports: [AuthService, JwtStrategy]
})
export class AuthGlobalModule {
    static forRoot(options: IOption): DynamicModule {
        const optionProvider = createOptionProvider(options);
        return {
            imports:[
                JwtModule.register({
                    privateKey: COMMON_SECRETKEY,
                    signOptions: {
                        expiresIn: COMMON_EXPIREIN,
                    },
                }),
                PassportModule.register({defaultStrategy: COMMON_DEFAULT_SGY})
            ],
            module: AuthGlobalModule,
            providers: [AuthService, JwtStrategy, optionProvider],
            exports: [AuthService, JwtStrategy]
        };
    }
}