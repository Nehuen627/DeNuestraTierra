import { Router } from 'express';
import { tokenGenerator} from '../utils/utils.js';
import passport from 'passport';
import userController from '../controller/userController.js';

const router = Router();
router.post('/sessions/register', passport.authenticate('register'/* , { failureRedirect: '/register' } */), async (req, res) => {
    /* res.redirect('/login'); */
    res.status(200).json({    success: true,    redirectUrl: 'http://localhost:3000/login'});
});
router.post('/sessions/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: "Internal server error" 
            });
        }
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: info.message || "Invalid credentials" 
            });
        }

        req.logIn(user, async (err) => {
            if (err) {
                return res.status(500).json({ 
                    success: false, 
                    message: "Error logging in" 
                });
            }

            const token = tokenGenerator(user);
            const isAdmin = user.role === "admin";

            try {
                if (isAdmin) {
                    res
                        .cookie('access_token', token, { 
                            maxAge: 1000*60*30, 
                            httpOnly: true, 
                            signed: true,
                            sameSite: 'lax'
                        })
                        .status(200)
                        .json({
                            success: true,
                            redirectUrl: 'http://localhost:3000/perfil',
                            user: user
                        });
                } else {
                    const date = new Date().toISOString();
                    const connection = await userController.lastConnection(user._id, date);
                    
                    if (connection) {
                        res
                            .cookie('access_token', token, { 
                                maxAge: 1000*60*30, 
                                httpOnly: true, 
                                signed: true,
                                sameSite: 'lax'
                            })
                            .status(200)
                            .json({
                                success: true,
                                redirectUrl: 'http://localhost:3000/perfil',
                                user: user
                            });
                    } else {
                        res.status(400).json({ 
                            success: false, 
                            message: "Connection error" 
                        });
                    }
                }
            } catch (error) {
                console.log(error);
                
                res.status(500).json({ 
                    success: false, 
                    message: "Server error" 
                });
            }
        });
    })(req, res, next);
});
router.get('/sessions/current', passport.authenticate('currentProfile', { session: false }), async (req, res) => {
    try {
       
        
        res.json({
            success: true,
            user: req.user
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authenticated"
        });
    }
});
router.get('/sessions/logout', passport.authenticate('currentProfile', { session: false }), async (req, res) => {
    if(req.user.role === "admin"){
        res
        .clearCookie('access_token')
        .json({
            success: true,   
            redirectUrl: 'http://localhost:3000/login'
        })
    } else {
        const date = Date()
        const connection = await userController.lastConnection(req.user._id, date)
        if(connection){
            res
            .clearCookie('access_token')
            .json({
                success: true,   
                redirectUrl: 'http://localhost:3000/login'
            })
        } else {
            res.json({
                success: false,   
                redirectUrl: 'http://localhost:3000/perfil'
            })
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