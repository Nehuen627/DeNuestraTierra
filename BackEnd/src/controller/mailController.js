import mailService from '../services/mailService.js';

const sendEmail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        const info = await mailService.sendEmail({ to, subject, text, html });
        res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

export default { sendEmail };
