var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "supriyacse506@gmail.com",
        pass: "prasanna@aww"
    }
});



router.post('/', function(req, res) {
        var User = new user(req.body);
        User.save(function(err, user)
         {
                if (err) 
                {
                console.log(err);
                }
            console.log(user);
            var mailOptions={
            to : req.body.email,
            subject : req.body.subject,
            text : req.body.text
             }
            console.log(mailOptions);

            smtpTransport.sendMail(mailOptions, function(error, response){
             if(error){
                console.log(error);
                res.end("error");
                    }
            else
             {
                console.log("Message sent: " + response.message);
                res.json({
                            "msg": "user created and mail sent"
                    });
            }
        });
        

    });
});
module.exports = router;
