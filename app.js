import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import client from './routes/dbconfig.js';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine" , 'ejs');
app.use(express.static("public"));


//import all the custom middleware router
import indexRouter from './routes/index.js';
import submit from './routes/submit.js';

//use all custom middleware router
app.get("/" , indexRouter);
app.post("/submit" , submit);



app.listen(3000 || process.env.PORT , function(){
    console.log(`App Server is running...`);
})