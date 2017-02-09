const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const multiparty = require('connect-multiparty'); 
multipartyMiddleware = multiparty();

let User = require('../models/user.js');
let Image = require('../models/image.js');

cloudinary.config({
    cloud_name: 'dcf6fjmnd',
    api_key: '683119174833665',
    api_secret: 'PntaGyGkdhsU5C778rddSSXyGM0'
});


let router = express.Router();

router.post('/login',function(request,response,next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            response.status(400).send({err:"Error"});
        }
        if(user){
                    let token = user.generateJwt();
                    request.session._id = user._doc._id;
                    request.session.token = token;
                    response.status(200).send({token:token})
        }else{
            response.status(401).send(info)
        }
  })(request, response);
});

router.post('/registrate',function(request,response){
    
    User.findOne({username:request.body.username},function(err,user,next){
        if(err){
            response.status(400).send({err:"Error"});
        }else if(user){
            response.status(400).send({err:"Such User unavailable"})
        }else{
            let newUser = new User({username:request.body.username,password:request.body.password,email:request.body.email,private:true});
            newUser.save(function(err){
                if(err){
                    response.status(400).send({err:"Some Error with DB"})
                }else{
                     let token = newUser.generateJwt();
                     request.session._id = user._doc._id;
                     request.session.token = token;
                    response.status(200).send({token:token})
                }
            })
        }
    })
});

router.post('/checkUser',function(request,response){

    if ('"'+request.session.token+'"' == request.body.token.toString()){
        User.findOne({_id: request.session._id},function(err,user){
            if(err){
                    response.status(400).send({err:"No User find"})
                }else{
                    response.status(200).send({username:user.username})
                }
        })
    }else{
        response.status(500).send({err:"You need to logout and login again"})
    }
})

router.post('/getCurrentUser',function(request,response){
    User.findOne({username:request.body.userId},function(err,user){
        if(err){
            response.status(400).send({err:"Error"});
        }
        response.status(200).send({username:user.username,_id:user._id,private:user.private,isAdmin:user.isAdmin});
    })
});

router.post('/getImagesCurrentUser',function(request,response){
    var currentImagesArray = [];
    Image.find({"_owner":request.body._id},function(err,data){
        if (err){
            response.status(400).send({err:"Error"});
        }else{
            data.forEach(function(im){
                currentImagesArray.push({url:im.url,id:im.public_id})
            })
            response.json(currentImagesArray)
        }
    })  
});

router.post('/upload', multipartyMiddleware, function (req, res, next) {
   
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, function (result) {
                if (result.url) {
                    // req.imageLink = result.url;
                    let image = new Image();
                    image.public_id = result.public_id;
                    image.url = result.url;
                    image._owner = req.session._id;
                    image.save((error, response) => {
                        res.status(201).json({public_id:result.public_id,url:result.url})
                        
                    })
                } else {
                    res.json(error);
                }
            });
        } else {
            next();
        }
    });

router.delete('/home/image/:id',function(request,response){
    Image.remove({'public_id':request.params.id},function(){
        cloudinary.api.delete_resources([request.params.id],
            function(result){
                response.status(200).send(true);
            });
    })
});

router.post('/updateUser',function(request,response){
    User.findByIdAndUpdate(request.body._id,{ $set: { private: request.body.private }}, { new: true },function(err,data){
        if (err) {
            response.status(400).send({err:"Error"});
        }else{
            response.status(200).send(true);
        }
    })
});

router.post('/getUsersList',function(request,response){
    if(!request.session._id){
        let users = [];
        User.find({"private":false},function(err,data){
            if (err) {
                response.status(400).send({err:"Error"});
            }else{
                    data.forEach(function(el){
                        users.push({username:el.username,_id:el._id,private:el.private,isAdmin:el.isAdmin});
                    }) 
                response.status(200).send(users);
            }
        })
        
    }else{
        User.findOne({_id:request.session._id},function(err,data){
            if (err) {
                response.status(400).send({err:"Error"});
            }else{
                console.log(data.isAdmin)
            }
        })
    }
});

router.post('/logout',function(request,response){
    request.session._id = null;
    request.session.token = null;
    response.status(200).send("ok")
});

router.get('/',function(request,response){
    response.sendFile('/client/index.html')
});

module.exports = router;