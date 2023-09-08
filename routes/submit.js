import express from 'express';
const router  = express.Router();
import client from './dbconfig.js';


export default router.use("/" ,  async function (req, res , next) {
    const {fullname , email , addressOne , addressTwo , city , state , zipcode } = req.body;
     
    try{
        //check if user already exists
        let user =  await client.collection('applicants').findOne({email: email});
        if (user) throw({error: true , message: "Applicant Already exists."});
        let response = client.collection('applicants').insertOne( {email , fullname , addressOne , addressTwo , city , state , zipcode , document_uri: []});
        res.render("submit-success" , {
            error: false ,
             message :"Thank you for submitting your application through our platform. We want to inform you that your application has been successfully received. Our company's dedicated team will carefully review your application and qualifications. If your profile aligns with our requirements, we will be in touch with you shortly to initiate the next steps in the application process. We appreciate your interest in joining our team and look forward to the possibility of working together. In the meantime, feel free to reach out if you have any questions or require additional information. Good luck!" , 
             title: "Application  Submited Sucessfully",
            proceed: '',
            back: '',
            
            });
        res.end();
        
    }catch(err){
        res.render("submit-error" , 
        {
            error: false ,
             message: err.message , 
             title: "Application Not Submited Sucessfully",
             proceed: '',
            back: ''
        });
        res.end();

    }
    
});


