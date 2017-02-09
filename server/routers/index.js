const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const multiparty = require('connect-multiparty'); 
multipartyMiddleware = multiparty();

let User = require('../models/user.js');
// let Image = require('../models/images.js');

let router = express.Router();

router.post('/login',function(request,response){

})

router.post('/registrate',function(request,response){
    
    User.findOne({username:request.body.username},function(err,user,next){
        if(err){
            response.status(400).json({err:"Error"});
        }else if(user){
            response.status(400).send({err:"Such User unavailable"})
        }else{
            let newUser = new User({username:request.body.username,password:request.body.password,email:request.body.email,private:true});
            newUser.save(function(err){
                if(err){
                    response.status(400).json(400,"Some Error with DB")
                }else{
                     let token = newUser.generateJwt();
                    response.status(200).send({token:token})
                }
            })
        }
    })
});

router.get('/',function(request,response){
    response.sendFile('/client/index.html')
})

module.exports = router;