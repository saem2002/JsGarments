import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import Route from './routes/Route.js'
import fileupload from 'express-fileupload'
import compression from 'compression'
import path from 'path'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000  ;
Connection();
app.use(compression({
    level:6,
    threshold:0,
    filter:(req,res)=>{
        if(req.headers['x-no-compression']){
            return false;
        }
        return compression.filter(req,res);
    }
}))
app.use(express.json());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload({
    useTempFiles:true
}))
app.use(Route);




app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));



