const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const multiparty = require('connect-multiparty'); 
multipartyMiddleware = multiparty();


let router = express.Router();

router.get('/',function(request,response){
    response.sendFile('/client/index.html')
})

module.exports = router;