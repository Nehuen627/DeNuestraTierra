export default {
    env: process.env.NODE_ENV || 'dev',
    url: process.env.WEB_URL,
    port: process.env.PORT,
    mailServer: process.env.MAIL_SERVER,
    mailSecure: process.env.MAIL_SECURE,
    mailPort: process.env.MAIL_PORT ,
    mail: process.env.MAIL,
    mailPass: process.env.MAIL_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbDb: process.env.DB_DB,
    jwtSecret: process.env.JWT_SECRET,
    adminData: {
        adminPass: process.env.ADMIN_PASS,
        adminMail: process.env.ADMIN_MAIL
    },
    cookieSecret: process.env.COOKIE_SECRET,
    sessionSecret: process.env.SESSION_SECRET
}