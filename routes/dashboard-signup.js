import express from 'express';
const router   = express.Router();
import client from './dbconfig.js';



export default router.use("/" ,  async function(req ,  res , next){
    console.log(req.body)
    if ( req.body.username ) {

        try {
            const  {username , userauth } = req.body;
            if (username == "" || userauth == "") throw({message: "Invalid Submit Data"})
            const response = await client.collection("admin").findOne({ username: username })
            console.log(response)
            if (response) throw({message: "Admin User Already exists!"});
            const result  = await client.collection("admin").insertOne({ username , userauth , profile_uri: '' });
            if (!result) throw({message: "Error Creating Admin User"});
            res.render("submit-success" , {
                message: 'Admin Account Created' , 
                error: false,
                title: "Account Created",
                back: "/dashboard-signup" , 
                proceed: "/dashboard-signin"
            });
            res.end();

        }catch(err){
            res.render("submit-error" , {
                message: err.message , 
                error: false,
                title: "Account Not Created",
                back: '/dashboard-signup'
            });
            res.end();
        }
       
    } else {
        res.render('dashboard-signup');
        res.end();
    }
});