import express from 'express';
const router  = express.Router();
import client from './dbconfig.js';

export default router.use("/" ,  async function (req, res , next) {
    const data = req.body;
     
    try{
        //check if user already exists
        let user =  await client.findOne({email: data.email});
        if (user) throw({error: true , message: "User Already exists."});
        let response = await client.insertOne( data);
        res.render("submit" , {error: false , message:'Application Submited'});
        res.end();
        
    }catch(err){
        res.render("submit" , {error: false , message: err.message});
        res.end();

    }
    
});


