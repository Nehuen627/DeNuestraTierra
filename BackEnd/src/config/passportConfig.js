import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Exception } from '../utils/utils.js';
import config from './envConfig.js'
import usersController from '../controller/userController.js';
import UserDTO from '../dao/DTO/userDTO.js';
import cartController from '../controller/cartController.js';

const optsUser = {
    usernameField: 'email',
    passReqToCallback: true,
};

function coookieExtractor(req) {
    let token = null;
    if (req && req.signedCookies) {
        token = req.signedCookies['access_token'];
    }
    return token;
}

const optsJWT = {
    jwtFromRequest: ExtractJwt.fromExtractors([coookieExtractor]),
    secretOrKey: config.jwtSecret,
};


export const init = () => {
    passport.use('register', new LocalStrategy(optsUser, async (req, email, password, done) => {        
        try {
            const isEmailUsed = await usersController.findEmail(email)
            if(isEmailUsed){
                return done(null, false, { message: "There is a user already created with that email" });
            } else {
                const data = {
                    ...req.body,
                    email,
                    password
                }
                const newUser = await usersController.addUser(data)
                
                if(newUser){
                    const addCart = await cartController.addCart(newUser.email)
                } else {
                    new Exception("Error adding user", 500)
                }
                return done(null, {
                    _id: newUser.id,
                    ...newUser
                });
            }
        }
        catch(error) {
            console.log("Register error:", error);
            return done(error);
        }
    }));
    passport.use('login', new LocalStrategy(optsUser, async (req, email, password, done) => {
        try {
            const emailAdmin = config.adminData.adminMail
            const passwordAdmin = config.adminData.adminPass
            if(email === emailAdmin && password === passwordAdmin){
                const user = {
                    _id: "admin",
                    cart: 1,
                    name: "current Admin",
                    lastName: "admin",
                    role: "admin",
                    birthdate: "Admin",
                    province: "admin",
                    email: email,
                }
                return done(null, user);
            } else {
                const user = await usersController.getUserData(email, password);
                if(user === "Email or password invalid") {
                    return done(null, false, { message: "Invalid credentials" });
                } else {
                    return done(null, {
                        _id: user.id,
                        ...user
                    });
                }
            }
        }
        catch(error) {
            return done(new Exception(`Error: ${error.message}`, 500));
        }
    }));

    passport.serializeUser((user, done) => {
        if (!user || (!user._id && !user.id)) {
            return done(new Error('Invalid user object for serialization'));
        }
        const userId = user._id || user.id;
        done(null, userId);
    });
    
    
    passport.deserializeUser(async (id, done) => {
        if (id === "admin") {
            const adminUser = {
                _id: "admin",
                cart: 1,
                firstName: "Admin",
                lastName: "admin",
                role: "admin",
                birthdate: "admin",
                email: "adminadmin@adming.com",
            };
            return done(null, adminUser);
        }
    
        try {
            const user = await usersController.findById(id);
            if (!user) {
                return done(new Error('User not found'));
            }
            done(null, {
                _id: user.id,
                ...user
            });
        } 
        catch (error) {
            done(error, null);
        }
    });
    passport.use('currentGeneral', new JwtStrategy(optsJWT, (payload, done) => {
        const userDTO = new UserDTO(payload);
        return done(null, userDTO);
    }));
    passport.use('currentProfile', new JwtStrategy(optsJWT, (payload, done) => {
        return done(null, payload);
    }));
    
}