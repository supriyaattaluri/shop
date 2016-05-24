var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var subcategory = mongoose.model('Subcategory');

router.post('/', function(req, res) {
    var Subcategory = new subcategory(req.body);
    Subcategory.save(function(err, subcategory) {
        if (err) console.log(err);

        console.log(subcategory);
        res.json({
            "msg": "success created"
        });

    });
})

router.get('/listall', function(req, res) {
    subcategory.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/list/:id', function(req, res) {
    subcategory.findById(req.params.id, function(err, subcategory) {
        if (err) {
            console.log(err);
        }
        res.json(subcategory);
    });
});
router.delete('/delete/:id', function(req, res) {
    subcategory.remove({
        _id: req.params.id
    }, function(err, subcatdeleted) {
        res.json({
            "msg": "record Deleted"
        });
    });
});
router.put('/edit/:id', function(req, res) {
    subcategory.update({
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
            message: 'student updated!'
        });
    });
});

module.exports = router;
