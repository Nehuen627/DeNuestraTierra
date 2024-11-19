import { Router } from 'express';
import { tokenGenerator} from '../utils/utils.js';
import passport from 'passport';
import userController from '../controller/userController.js';

const router = Router();
router.post('/sessions/register', passport.authenticate('register'/* , { failureRedirect: '/register' } */), async (req, res) => {
    /* res.redirect('/login'); */
    res.json("done")
});
router.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {

    const token = tokenGenerator(req.user)
    if(req.user.role === "admin"){
        res
        .cookie('access_token', token, { maxAge: 1000*60*30, httpOnly: true, signed: true })
        .status(200)
        .redirect('htpp://localhost:3000/productos');
    } else {
        const date = Date()
        const connection = await userController.lastConnection(req.user._id, date)
        if(connection){
            res
            .cookie('access_token', token, { maxAge: 1000*60*30, httpOnly: true, signed: true })
            .status(200)
            .redirect('/perfil');
        } else {
            res.redirect('/login')
        }
    }
});
router.get('/sessions/current', passport.authenticate('current', { failureRedirect: '/login' }), async (req, res) => {
    const currentUser = req.user;
    res.json({ user: currentUser });
});
router.get('/sessions/logout', passport.authenticate('currentProfile', { session: false }), async (req, res) => {
    if(req.user.role === "admin"){
        res
        .clearCookie('access_token')
        .redirect('/login')
    } else {
        const date = Date()
        const connection = await userController.lastConnection(req.user._id, date)
        if(connection){
            res
            .clearCookie('access_token')
            .redirect('/login')
        } else {
            res.redirect('/perfil')
        }
    }

});
router.post('/sessions/changePassword', async (req, res) => {
    try {
        const { body:{ email } } = req;
        const user = await userController.findEmail(email);
        if (user){
            const finalToken = uuidv4()
            await userController.generateLink(email, finalToken);
            const url = config.url
            const mailOptions = {
                from: config.nodemailer.email,
                to: email,
                subject: 'Reset your password',
                text: `Hi from the apples shop!
                
                Are you wanting to change your password?
                Click on this link below and follow the instructions:
                ${url}/resetPassword/${user._id}/${finalToken}
                If you did not request a new password please ignore this message.
                `
            };
            const mail = await transporter.sendMail(mailOptions); 
            if(mail){            
                res.render('waiting')
            } else {
                console.error(`Error sending reset password email to ${user.email}`);
            } 
        } else {
            res.redirect('/cambiarContraseña');
        }
    }
    catch (error) {
        req.logger.error(error)
        res.redirect('/cambiarContraseña');
    }
})
router.post('/sessions/trueChangePassword', async (req, res) => {
    try {
        const { body:{ uid, password } } = req;
        const exist = await userController.findById(uid);
        if (exist){
            const updated = await userController.updateData("password", password, exist._id);
            if(updated){
                res.redirect('/login')
            } else {
                res.status(401).send("You can not use the same password")
            }
        } else {
            res.redirect('/cambiarContraseña');
        }
    }
    catch (error) {
        res.redirect('/cambiarContraseña');
    }
})

export default router;