export default {
    env: process.env.NODE_ENV || 'dev',
    url: process.env.WEB_URL,
    port: process.env.PORT,
    mailServer: process.env.MAIL_SERVER,
    mailSecure: process.env.MAIL_SECURE,
    mailPort: process.env.MAIL_PORT ,
    mail: process.env.MAIL,
    mailPass: process.env.MAIL_PASSWORD 
}