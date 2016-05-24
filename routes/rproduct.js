var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var product = mongoose.model('Product');

router.post('/', function(req, res) {
    var Product = new product(req.body);
    Product.save(function(err, product) {
        if (err) console.log(err);

        console.log(product);
        res.json({
            "msg": "success created"
        });

    });
})

router.get('/listall', function(req, res) {
    product.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/list/:id', function(req, res) {
    product.findById(req.params.id, function(err, product) {
        if (err) {
            console.log(err);
        }
        res.json(product);
    });
});
router.delete('/delete/:id', function(req, res) {
    product.remove({
        _id: req.params.id
    }, function(err, userdeleted) {
        res.json({
            "msg": "record Deleted"
        });
    });
});
router.put('/edit/:id', function(req, res) {
    product.update({
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
