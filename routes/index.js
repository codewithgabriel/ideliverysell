import express from 'express';
const router   = express.Router();

export default router.use("/" , function(req ,  res , next){
    res.render("index");
});