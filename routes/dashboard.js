import express from 'express';
const router   = express.Router();
import client from './dbconfig.js';

export default router.use("/" , async function(req ,  res , next){
    console.log(req.session.user)
    try{
        if (!req.session.user) throw({message: "Session Not Initialized"})
        let query_applicants =  await client.collection('applicants').find({});
        if (!query_applicants) throw({message: "Error fetching Applicants"});
       let applicants = await query_applicants.toArray()
        

        res.render('dashboard',  {
            total: applicants.length ,
            applicants: applicants

        })
        res.end();

    }catch(err) {
        res.render('submit-error' , {
            message: err.message , 
            title: "Session Not Found",
            back: '/dashboard-signin'

        });
        console.log(err.message)
        res.send();
    }
});