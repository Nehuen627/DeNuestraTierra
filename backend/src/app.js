import express from "express"
import cors from 'cors';
import config from './config/envConfig.js'
import indexRouter from "./routers/indexRouter.js"
import { __dirname } from "./utils/utils.js";
import path from "path"
/* Initialize server */
const app = express();
app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));


/* Initialize cors */
const PORT = config.port;
app.use(cors({
    origin:  'http://localhost:3000',
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
}));


app.use('/', indexRouter);


export default app
