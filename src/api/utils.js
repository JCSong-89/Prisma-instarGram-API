import { adjectives, nouns } from "./words"
import nodeMailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport'
import dotenv from "dotenv";
import path from 'path';
dotenv.config({path: path.resolve(__dirname, ".env")});
import jwt from 'jsonwebtoken';

export const secretGenerator = () => {
        const randomNumber = Math.floor(Math.random() * adjectives.length);
        return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
};




const sendMaill = (email) => {
    
    const options = {
        auth:{
            api_user: process.env.SENDGRID_USER,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }
    const client = nodeMailer.createTransport(sgTransport(options))
    return client.sendMail(email)    
}


export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "gandalfzzing@gmail.com",
        to: adress,
        subject: "Login Secret for Prismagram",
        html: `hello Your Login secret is <strong>${secret}</strong>.<br/> Copy paste on the app to log in`

    }
    return sendMaill(email);
}


export const token = id => jwt.sign({id}, process.env.JWT_SECRET);




