export interface IOption {
    level?: 'ALL' | 'INFO' | 'WARN' | 'ERROR';
    env?: 'dev' | 'sit' | 'pre' | 'prd' | string;
    prefix: string;
}
