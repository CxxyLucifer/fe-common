import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { iContent, iMailOptions } from './interface';

@Injectable()
export class EmailService {
    sendEmail(mailConfig: iContent): Promise<string> {
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
            try {
                transporter.sendMail(mailOptions,(err, info)=>{
                    if (err) {
                        reject('发送失败!');
                    }
                    resolve('发送成功!');
                })
            } catch (err) {
                reject(err);
            }
        })
    }
}