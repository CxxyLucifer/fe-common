import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Log4jsService } from '../log4js/log4js.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApiCode } from '../enum/api.code.enum';
import { IOption } from './interface';
import { BaseResponse } from '../response';

export class ResponseSuccessTransformInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
  option: IOption;
  log4;
  constructor(option?: IOption){
    this.option = option;
    const { enableLog = false, env, prefix } = option;
    if (enableLog) {
      this.log4 = new Log4jsService({level: 'INFO', env, prefix})
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<BaseResponse<T>> | Promise<Observable<BaseResponse<T>>> {
    const request: Request = context.switchToHttp().getRequest()
    const { enableLog = false } = this.option;
    
    const now = Date.now();
    const requestInfo = {
      url: request.url,
      method: request.method,
      body: request.body,
    }

    const currentUser = (request as any).user ? (request as any).user : {}

    return next.handle().pipe(
      map(res => {
        const resObj = {
          code: ApiCode.SUCCESS,
          data: res || null,
          message: '请求成功',
          success: true,
        }
        if (enableLog) {
          this.log4.log({
            requestUser: JSON.stringify(currentUser),
            request: JSON.stringify(requestInfo),
            response: JSON.stringify(resObj),
            costTime: `${Date.now() - now}ms`
          }, 'success')
        }
        return resObj
      }),
    );
  }
}
