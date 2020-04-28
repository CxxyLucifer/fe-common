export interface IOption {
    level?: 'ALL' | 'INFO' | 'WARN' | 'ERROR';
    nodeEnv?: 'dev' | 'sit' | 'pre' | 'prd';
    logFilePrefix: string;
}
