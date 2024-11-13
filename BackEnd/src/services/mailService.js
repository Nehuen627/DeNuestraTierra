import nodemailer from 'nodemailer';
import config from '../config/envConfig.js';

const transporter = nodemailer.createTransport({
    host: config.mailServer,
    port: config.mailPort, 
    secure: config.mailSecure, 
    auth: {
        user: config.mail,
        pass: config.mailPass
    },
    tls: config.env === 'production' ? {} : { rejectUnauthorized: false },
});

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: config.mail,
            to,
            subject,
            text,
            html,
        });

        return info;
    } catch (error) {
        throw new Error(`Error sending email: ${error.message}`);
    }
};

export default { sendEmail };
