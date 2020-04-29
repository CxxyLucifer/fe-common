export interface IOption {
    env?: 'dev' | 'sit' | 'pre' | 'prd' | string;
    folder: string;
}

export interface EnvConfig {
    [key: string]: string;
 }
