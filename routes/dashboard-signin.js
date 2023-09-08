import express from 'express';
const router   = express.Router();
import client from './dbconfig.js';


export default router.use("/" , async function(req ,  res , next){
    if ( req.body.username ) {
        try {
            const  {username , userauth } = req.body;
            if (username == "" || userauth == "") throw({message: "Invalid Submit Data"})
            const response = await client.collection("admin").findOne({ username: username })
            if (!response) throw({message: "Invalid Credential"});
            if (response.userauth != userauth)  throw({message: 'User Authentication Error'})

            req.session.user = username;
            req.session.save();
            res.redirect("/dashboard");
          
            res.end();
            
            
           

        }catch(err){
            res.render("submit-error" , {
                message: err.message , 
                error: false,
                title: "Authentication Error",
                back: '/dashboard-signin'
            });
            res.end();
        }
       
    } else {
        res.render('dashboard-signin');
        res.end();
    }
});