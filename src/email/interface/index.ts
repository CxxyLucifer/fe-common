export interface IOption {
    host: string;
    port: number;
    auth_user: string;
    auth_pass: string;
}


export interface iMailOptions {
    from: String;
    to: String;
    subject: String;
    text?: String;
    html?: String;
    attachments?: file[]
}

export interface iContent {
    sender_host: string;
    sender_port: number;
    sender_auth_user: string;
    sender_auth_pass: string;
    transport?: 'default' | 'smtp';
    target: String; //多个用逗号隔开，例如 '19941558406@163.com,447092991@qq.com'
    title: String;
    text?: String;
    html?: String;
    attachments?: file[]
}

export interface file {
    filename: String;
    path: String;
}

export interface iResult {
    httpCode: Number;
    message: any;
}

export class EmailSendResVo {
    httpCode: number;

    message: string;
}
