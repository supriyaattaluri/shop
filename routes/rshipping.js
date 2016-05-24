var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var shipping = mongoose.model('Shipping');

router.post('/', function(req, res) {
    var Shipping = new shipping(req.body);
    Shipping.save(function(err, shipping) {
        if (err) console.log(err);

        console.log(shipping);
        res.json({
            "msg": "success created"
        });

    });
})

router.get('/listall', function(req, res) {
    shipping.find({}, function(err, shipping) {
        res.json(shipping);
    });
});

router.get('/list/:id', function(req, res) {
    shipping.findById(req.params.id, function(err, shipping) {
        if (err) {
            console.log(err);
        }
        res.json(shipping);
    });
});
router.delete('/delete/:id', function(req, res) {
    shipping.remove({
        _id: req.params.id
    }, function(err, userdeleted) {
        res.json({
            "msg": "record Deleted"
        });
    });
});
router.put('/edit/:id', function(req, res) {
    shipping.update({
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
