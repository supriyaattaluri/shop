var express = require('express');
var path = require('path');
// var morgan = require('morgan');
// var cons = require('consolidate');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser');
var nodemailer = require("nodemailer");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var expressSession = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');


var app = express();
var config = require('./config');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(morgan('dev'));


// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

//passport initialization
app.use(expressSession({secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


require('./model/product')(mongoose);
require('./model/category')(mongoose);
require('./model/brand')(mongoose);
require('./model/subcategory')(mongoose);
require('./model/order')(mongoose);
require('./model/shipping')(mongoose);

var User = require('./model/user')(mongoose);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(config.database, function(err, db) {
    if (err) {
        console.log(err);
    }
   
});




 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates

app.use(flash());

var product = require('./routes/rproduct');
app.use('/product', product);

var category = require('./routes/rcategory');
app.use('/category', category);

var brand = require('./routes/rbrand');
app.use('/brand', brand);

var subcategory = require('./routes/rsubcategory');
app.use('/subcategory', subcategory);

var order = require('./routes/rorder');
app.use('/order', order); 

var user= require('./routes/ruser');
app.use('/user',user);

/*var forgotpwd = require('./routes/forgotpwd');
app.use('/forgot', forgotpwd);*/

var shipping = require('./routes/rshipping');
app.use('/shipping', shipping);

var fileupload = require('./routes/fileuploader');
app.use('/fileupload', fileupload);

app.listen(3000);
console.log('running at 3000');
						