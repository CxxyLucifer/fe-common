import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Log4jsService } from '../log4js/log4js.service';
import { IOption } from './interface';

@Catch(HttpException)
export class ResponseErrorExceptionFilter implements ExceptionFilter {
  option: IOption;
  log4;
  constructor(option?: IOption){
    this.option = option;
    const { enableLog = false, env, prefix } = option;
    if (enableLog) {
      this.log4 = new Log4jsService({level: 'INFO', env, prefix})
    }
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: Request = ctx.getRequest()
    const { enableLog = false } = this.option;

    const message = exception.message.message || exception.message.error;
    const errorCode = (exception as any).errorCode;
    const errorMessage = (exception as any).errorMessage;
    
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      data: {},
      message: errorMessage || message,
      success: false,
      code: errorCode || status,
    };
    const errorRequest = {
      url: request.url,
      method: request.method,
      body: request.body,
    }
    
    const currentUser = (request as any).user ? (request as any).user : {}
    if (enableLog) {
      this.log4.error(`requsetUser:${JSON.stringify(currentUser)},request:${JSON.stringify(errorRequest)},response:${JSON.stringify(errorResponse)}`, '', 'fail')
    }

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
