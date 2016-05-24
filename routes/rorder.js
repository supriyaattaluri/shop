var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var order = mongoose.model('Order');

router.post('/', function(req, res) {
    var Order = new order(req.body);
    Order.save(function(err, order) {
        if (err) console.log(err);

        console.log(order);
        res.json({
            "msg": "success created"
        });

    });

})

router.get('/listall', function(req, res) {
    order.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/list/:id', function(req, res) {
    order.findById(req.params.id, function(err, order) {
        if (err) {
            console.log(err);
        }
        res.json(order);
    });
});
router.delete('/delete/:id', function(req, res) {
    order.remove({
        _id: req.params.id
    }, function(err, orderdeleted) {
        res.json({
            "msg": "record Deleted"
        });
    });
});
router.put('/edit/:id', function(req, res) {
    order.update({
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
