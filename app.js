const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const session = require("express-session");
const multiparty = require('connect-multiparty');
multipartyMiddleware = multiparty();

const router = require('./server/routers');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds159328.mlab.com:59328/belinsta');

app.use(express.static(path.join(__dirname , '/client')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/',router);

app.listen(3000,function(){
    console.log("Server is started at 3000 port");
})