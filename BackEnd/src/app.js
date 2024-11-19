import express from "express"
import cors from 'cors';
import config from './config/envConfig.js'
import expressSession from 'express-session';
import indexRouter from "./routers/indexRouter.js"
import { __dirname } from "./utils/utils.js";
import path from "path"
import bodyParser from 'body-parser'; 
import  { init as initPassportConfig } from "./config/passportConfig.js"
import passport from "passport";
import cookieParser from 'cookie-parser';
import  sessionStore  from "./db/dbSessionStore.cjs";

/* Initialize server */
const app = express();
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());

app.use(cookieParser(config.cookieSecret));


app.use(expressSession({
        secret: config.sessionSecret,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, 
            secure: false, 
        },
    })
);
/* Initialize cors */

app.use(cors({
    origin:  'http://localhost:3000',
    methods: ["GET", "POST", 'PUT', 'DELETE'],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));


initPassportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);


export default app
