var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var user = mongoose.model('User');
var mailTransport = require('../common/mailsending');


router.post('/register', function(req, res) {
    user.register(new user({ username : req.body.username , email : req.body.email, address : req.body.address }),req.body.password, function(err, user) {
        if (err) {
            return res.json(err);
        }

        passport.authenticate('local')(req, res, function () {
            mailTransport.mailer(user.email,'Welcome test','Welcome Message'); 
            res.json({"msg":"user registered successfully"});
        });
    });
});



router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({"msg" : "success"});
});


router.post('/forgot', passport.authenticate('local'), function(req,res){
    //console.log(err);

     user.findOne({ username: req.body.username}, function (err, User) {
        
        user.remove({ username: req.body.username},function(err, userdeleted){
            console.log("User Deleted");

            req.body.password = req.body.newpassword;
            delete req.body.newpassword;
            delete req.body.confirm;
            
            user.register(new user(req.body),req.body.password, function(err, user) {
            if (err) { return res.json(err);  }
            
            res.json({"msg":"updated user details"});
            
                 //passport.authenticate('local')(req, res, function () {
                    //mailTransport.mailer(user.email,'Welcome test','Welcome Message'); 
                //});
            });
        
        });
    });
});





router.get('/listall', function(req, res) {
    
    // pagination done here with sort limit and skip.
    // pagenumber=1 for last updated result from db. if it is 2 it 
    // shows first inserted docs from db.
        var _pageNumber = 1,
        _pageSize = 5;
        user.find({},null,{sort: { Name: 1 }}).skip(_pageNumber > 0 ? ((_pageNumber - 1) * _pageSize) : 0).limit(_pageSize).exec(function(err, docs) {
                         if (err)
                                { res.json(err); }
                        else
                        res.json({
                          "TotalCount": docs.length,
                          "_Array": docs
                        });
                });
        });


router.get('/list/:id', function(req, res) {
            user.findById(req.params.id, function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.json(user);
            });
        });

router.get('/delete/:id', function(req, res) {
            user.remove({
                _id: req.params.id
            }, function(err, userdeleted) {
                res.json({
                    "msg": "record Deleted"
                });
            });
        });


router.put('/edit/:id', function(req, res) {
        user.update({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            w: 1
        }, function(err, result) {
            if (err) {
                console.log(err.stack);
            }
            res.json({
                message: 'user updated!'
            });
        });
    });



module.exports = router;
