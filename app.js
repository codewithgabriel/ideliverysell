import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import client from './routes/dbconfig.js';
import morgan from 'morgan';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine" , 'ejs');
app.use(express.static("public"));
app.use(morgan('dev'));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


//import all the custom middleware router
import indexRouter from './routes/index.js';
import submit from './routes/submit.js';
import about from './routes/about.js';
import dashboard from './routes/dashboard.js';
import dashboardSignin from './routes/dashboard-signin.js';
import dashboardSignup from './routes/dashboard-signup.js';
import session from 'express-session';
import upload from './routes/upload.js';
import applicantsInfo from './routes/applicants-info.js';


//use all custom middleware router
app.get("/" , indexRouter);
app.post("/submit" , submit);
app.get('/about' , about);
app.get('/dashboard' , dashboard);
app.get('/dashboard-signin' , dashboardSignin);
app.post('/dashboard-signin' , dashboardSignin);
app.get('/dashboard-signup' , dashboardSignup);
app.post('/dashboard-signup' , dashboardSignup);
app.get("/:email/upload" , upload);
app.post("/:email/upload" , upload);
app.get('/:email/info' , applicantsInfo);








app.listen(3000 || process.env.PORT , function(){
    console.log(`App Server is running...`);
})