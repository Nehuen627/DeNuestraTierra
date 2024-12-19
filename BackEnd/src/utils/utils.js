import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import JWT from 'jsonwebtoken';
import {createError} from './createError.js';
import config from "../config/envConfig.js"

export const __dirname = path.dirname(__filename);


export const tokenGenerator = (user) => {
    const {
        _id,
        name,
        lastName,
        email,
        birthDate,
        province,
        role,
        cart,
        documents,
        lastConnection,
        informativeEmails
    } = user;    
    
    const payload = {
        _id,
        name,
        lastName,
        email,
        birthDate,
        province,
        role,
        cart,
        documents,
        lastConnection,
        informativeEmails
    };
    return JWT.sign(payload, config.jwtSecret, { expiresIn: '30m' });
}



export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
};

export function authenticateLevel(level) {
    return async (req, res, next) => {
        try {
            // Check both Authorization header and cookies for token
            const authHeader = req.headers.authorization;
            const cookieToken = req.signedCookies?.access_token;
            
            let token;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            } else if (cookieToken) {
                token = cookieToken;
            }
            
            if (!token) {
                return res.status(401).send({ message: 'No token provided' });
            }

            // Verify and decode token
            const decoded = JWT.verify(token, config.jwtSecret);
            req.user = decoded;  // Add user data to request

            // Now check levels with the decoded user data
            if(level === 1){
                next()
            } else if (level === 2){
                if(req.user.role === "admin") {
                    next()
                } else {
                    res.status(401).send({ message: 'You are not authorised to perform this action'});
                }
            } else if (level === 3) {
                if(req.user.role === "user") {
                    next()
                } else {
                    res.status(405).send({ message: 'User level required'});
                }
            } else if (level === 4){
                if(req.user.role === "admin" || req.user.role === "owner") {
                    next()
                } else {
                    res.status(405).send({ message: 'Admin or owner level required'});
                }
            }
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).send({ message: 'Invalid token' });
            }
            createError.Error({
                name: 'Authentication error',
                cause: error,
                message: 'An error occurred within the authenticate method',
            });
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}