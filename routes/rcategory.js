var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var category = mongoose.model('Category');

router.post('/', function(req, res) {
    var Category = new category(req.body);
    Category.save(function(err, category) {
        if (err) console.log(err);

        console.log(category);
        res.json({
            "msg": "success created"
        });

    });
})

router.get('/listall', function(req, res) {
    category.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/list/:id', function(req, res) {
    product.findById(req.params.id, function(err, category) {
        if (err) {
            console.log(err);
        }
        res.json(category);
    });
});
router.delete('/delete/:id', function(req, res) {
    category.remove({
        _id: req.params.id
    }, function(err, userdeleted) {
        res.json({
            "msg": "record Deleted"
        });
    });
});
router.put('/edit/:id', function(req, res) {
    category.update({
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
