import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Exception } from '../utils/utils.js';
import config from './envConfig.js'
import usersController from ;
import UserDTO from ;
import {createError} from '../utils/createError.js';
import cartsController from ;

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
                const data = req.body 
                const newUser = await usersController.addUser(data)
                done(null, newUser);
            }
        }
        catch(error) {
            return done(
                createError.Error({
                    name: 'Register error',
                    cause: error,
                    message: 'An error occured within the register method',
                })
            );
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
                    role: "admin",
                    age: "AdminAge",
                    email: email,
                    documents: "",
                }
                done(null, user);
            } else {
                const user = await usersController.getUserData(email, password);
                if(user === "Email or password invalid") {
                    return done(createError.Error({
                        name: 'Login error',
                        cause: generatorUserLoginError(email, password),
                        message: 'Email or password invalid',
                    }))
                } else {
                    done(null, user);
                }
            }
        }
        catch(error) {
            done(new Exception(`Error: ${error.message}`, 500));
        }
    }));

    passport.use('github', new GithubStrategy({
        clientID: config.github.clientID, 
        clientSecret: config.github.clientSecret,
        callbackURL: "http://localhost:8080/auth/sessions/github-callback", 
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile._json.email;
            const githubId = profile.id;

            if (!email) {
                const userWithGithubId = await usersController.findUserByGithubId(githubId);

                if (userWithGithubId) {
                    return done(null, userWithGithubId);
                }
                const data = {
                    firstName: profile._json.name,
                    lastName: '',
                    email: undefined,
                    age: '',
                    password: '',
                    provider: 'Github',
                    githubId: githubId, 
                    cart: "",
                    document: '',
                    lastConnection: ""
                };
    
                const newUser = await usersController.addGithubUser(data);
                return done(null, newUser);
            }
    
            let user = await usersController.findEmail(email);
            if (user) {
                return done(null, user);
            }
            const userCart = await cartsController.addCart(email)
            const data = {
                firstName: profile._json.name,
                lastName: '',
                email: email,
                age: '',
                password: '',
                provider: 'Github',
                document: '',
                lastConnection: "",
                cart: userCart
            };
    
            const newUser = await usersController.addGithubUser(data);
            done(null, newUser);
        } catch (error) {
            done(error, null);
        }
    }));
    

    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    
    passport.deserializeUser(async (id, done) => {
        if (id === "admin") {
            const adminUser = {
                _id: "admin",
                cart: 1,
                firstName: "Admin",
                lastName: "Coder",
                role: "admin",
                age: "AdminAge",
                email: "adminCoder@coder.com",
                document: ''
            };
            return done(null, adminUser);
        }
    
        try {
            const user = await usersController.findById(id);
            done(null, user);
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