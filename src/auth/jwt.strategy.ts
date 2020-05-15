import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import axios from 'axios';

import { COMMON_SECRETKEY, AUTH_OPTION } from '../constants/common.constant';
import { IOption, UserBetaResDto } from './interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_OPTION)
    private readonly option: IOption,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: COMMON_SECRETKEY,
    });
  }

  async validate(payload, done: VerifiedCallback) {
    const { userId } = payload;
    const { host } = this.option;
    
    const res = await axios.post<UserBetaResDto>(`${host}/heimdallr-web/user/queryBatchUserInfo`,{
      systemId: 1000, 
      userIds: [userId]
    })

    if (res.data.success && !res.data.data[0].betaUser) {
      throw new UnauthorizedException('没找到该用户!');
    }
    return done(null, res.data.data[0]);
  }
}