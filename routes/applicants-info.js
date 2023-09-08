import express from 'express';
const router   = express.Router();
import client from './dbconfig.js';


export default router.use("/:email" ,  async function(req ,  res , next){
    try {
        const {email } = req.params;
        if (!email) throw({message: "Invalid parameter"});
        let result =  await client.collection('applicants').findOne({email});
        if (!result) throw({message: "Applicant Not Found"});
        console.log(result);

        res.render('applicant-info' , {
            document_front: result.document_uri[0],
            document_back: result.document_uri[1],
            fullname: result.fullname

        })
    }catch(err){
        res.render('submit-error' , {
            title: "Error Occuried", 
            message: err.message,
            back: '/' , 
            proceed: ''


        })
     res.end();


    }
});