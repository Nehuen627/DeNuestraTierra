import express from "express"
import cors from 'cors';
import config from './config/envConfig.js'
import indexRouter from "./routers/indexRouter.js"
import { __dirname } from "./utils/utils.js";
import path from "path"
import bodyParser from 'body-parser'; 


/* Initialize server */
const app = express();
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());

/* Initialize cors */

app.use(cors({
    origin:  'http://localhost:3000',
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));


app.use('/', indexRouter);


export default app
