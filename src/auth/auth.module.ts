import { Global, Module, DynamicModule } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';

import { createOptionProvider } from "./auth.provider";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { IOption } from "./interface";
import { 
    COMMON_SECRETKEY, 
    COMMON_EXPIREIN 
} from "../constants/common.constant";

@Module({
    imports:[
        JwtModule.register({
            privateKey: COMMON_SECRETKEY,
            signOptions: {
                expiresIn: COMMON_EXPIREIN,
            },
        })
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
                })
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
        })
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
                })
            ],
            module: AuthGlobalModule,
            providers: [AuthService, JwtStrategy, optionProvider],
            exports: [AuthService, JwtStrategy]
        };
    }
}