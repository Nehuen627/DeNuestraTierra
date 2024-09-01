import {Router} from 'express';
import nodemailer from 'nodemailer';
import config from '../config/envConfig.js'

const router = Router()


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

// Define route to send email
router.post('/sendEmail', async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        const info = await transporter.sendMail({
            from: config.mail,
            to,
            subject,
            text,
            html,
        });

        res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

export default router
