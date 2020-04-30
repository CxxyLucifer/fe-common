export interface IOption {
    enableLog: boolean;
    env?: 'dev' | 'sit' | 'pre' | 'prd' | string;
    prefix: string;
}