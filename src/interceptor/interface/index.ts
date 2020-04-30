export interface IOption {
    enableLog: boolean;
    env?: 'dev' | 'sit' | 'pre' | 'prd' | string;
    prefix?: string;
}

export interface BaseResponse<T> {
    code: number;
    data: T;
    success: boolean;
    message: string;
  }