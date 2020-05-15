import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create();

instance.defaults.headers['Content-Type'] = 'application/json';
instance.defaults.headers.Accept = 'application/json';

interface BaseResponse<T> {
    code: number;
    data: T;
    success: boolean;
    msg: string;
}

export const HttpUtil = {
    get: <T = any>(url: string, config?: AxiosRequestConfig) => {
        return instance.get<BaseResponse<T>>(url, config).then(res => res.data);
    },
    post: <T = any>(url: string, data: any = {}, config?: AxiosRequestConfig) => {
        return instance.post<BaseResponse<T>>(url, data, config).then(res => res.data);
    },
    request: <T = any>(config: AxiosRequestConfig) => instance.request<BaseResponse<T>>(config)
};


