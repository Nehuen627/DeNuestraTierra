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
        catch (Error) {
            createError.Error({
                name: 'Authentication error',
                cause: Error,
                message: 'An error occured within the authenticate method',
            });
        }
    }
}