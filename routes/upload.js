import express from 'express';
const router   = express.Router();
import client from './dbconfig.js';
import uploader from './uploader.js';




export default router.use("/:email" , uploader.any() , async function(req ,  res , next){
   try {
    if (!req.params.email) throw({message: "Invalid Params"});
    req.session.user = req.params.email;

    const { email } = req.params;
    //fetch message from db 
    let result  = await client.collection('applicants').findOne({email :  email });
    if (!result) throw({message: "Error Identifying User"});
    if (req.files){
        let document = [];
        for ( let file of req.files ) {
            document.push(file.filename);
        }
        let user_update = await client.collection('applicants').updateOne({email: email} , {$set: { document_uri: document }} );
        if (!user_update) throw ({message: 'Error occur while updating user profile'});

        res.render('submit-success' , {
            title: "Document Uploaded Successfully",
            message: "Your application is now under review, our team will get in touch with you shortly",
            proceed: '', 
            back: '/'

        })

        res.end();


    }
   
    
    res.render("upload" , { 
        fullname :  result.fullname,
        email: result.email

    })
    res.send()

   }catch(err){
    res.render('submit-error' , {
        title: "Error Occuried",
        message: err.message,
        proceed: '', 
        back: '/'

    })

    console.log(err.message);
    res.end();
   }
});

router.use(function(req , res ,next) {
    let email = req.session.user;
    console.log(email);

})

