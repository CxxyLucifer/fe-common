import { Injectable, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { iContent, iMailOptions, EmailSendResVo } from './interface';

@Injectable()
export class EmailService {
    sendEmail(mailConfig: iContent): Promise<EmailSendResVo> {
        return new Promise((resolve, reject) => {
            const {transport = 'default', target, title, text, html, attachments } = mailConfig;

            let transporter
            const emailHost = mailConfig.sender_host
            const emailPort = mailConfig.sender_port
            const authUser = mailConfig.sender_auth_user
            const authPass = mailConfig.sender_auth_pass
            
            if(transport === 'default') {
                transporter = nodemailer.createTransport({
                    host: emailHost,
                    auth: { user: authUser, pass: authPass }
                })
            } else {
                transporter = nodemailer.createTransport(smtpTransport({
                    host: emailHost,
                    secure: true,
                    secureConnection: true,
                    port: emailPort,
                    auth: { user: authUser,  pass: authPass }
                }))
            }

            const mailOptions: iMailOptions = {
                from: authUser,
                to: target,
                subject: title
            }
            if(text) {
                mailOptions.text = text
            }
            if(html) {
                mailOptions.html = html
            }
            if(attachments) {
                mailOptions.attachments = attachments
            }
            let result =  new EmailSendResVo()
                result.httpCode = HttpStatus.OK
                result.message = '发送成功!'

            try {
                transporter.sendMail(mailOptions,(err, info)=>{
                    if (err) {
                        result.httpCode = HttpStatus.INTERNAL_SERVER_ERROR;
                        result.message = err;
                        reject(result);
                    }
                    resolve(result);
                })
            } catch (err) {
                result.httpCode = HttpStatus.INTERNAL_SERVER_ERROR;
                result.message = err;
                reject(result);
            }
        })
    }
}