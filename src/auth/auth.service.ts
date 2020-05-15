import { ApiException } from './../exception/api.exception';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

import { AUTH_OPTION } from "../constants/common.constant";
import { IOption, LoginResDto, LoginUserInfo } from './interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTH_OPTION)
        private readonly option: IOption,

        private readonly jwtService: JwtService
    ){}

    async login(account: string, password: string) {
        const { host } = this.option;
        const loginInfo = await axios.post<LoginResDto>(`${host}/heimdallr-web/hm/login`,{
            account, 
            password,
        })
        if(!loginInfo.data.success){
            throw new ApiException(loginInfo.data.msg)
        }   
        const user = loginInfo.data.data;
        const token = this.signToken({userId: user.userId, userName: user.userName, userNameZh: user.userNameZh })
        
        const result: LoginUserInfo = {
            userId: user.userId,
            userName: user.userName,
            userNameZh: user.userNameZh,
            token
          };
        return result
    }

    private signToken(data) {
        return this.jwtService.sign(data);
    }
}