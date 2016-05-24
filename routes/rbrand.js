var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var brand = mongoose.model('Brand');

router.post('/', function(req, res) {
    var Brand = new brand(req.body);
    Brand.save(function(err, brand) {
        if (err) console.log(err);

        console.log(brand);
        res.json({
            "msg": "success created"
        });

    });
})

router.get('/listall', function(req, res) {
    brand.find({}, function(err, brand) {
        res.json(brand);
    });
});

router.get('/list/:id', function(req, res) {
    brand.findById(req.params.id, function(err, brand) {
        if (err) {
            console.log(err);
        }
        res.json(brand);
    });
});

router.delete('/delete/:id', function(req, res) {
    brand.remove({
        _id: req.params.id
    }, function(err, userdeleted) {
        res.json({
            "msg": "record Deleted"
        });
    });
});

router.put('/edit/:id', function(req, res) {
    brand.update({
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
