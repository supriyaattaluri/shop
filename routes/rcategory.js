var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var category = mongoose.model('Category');
var subcategory = mongoose.model('Subcategory');

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


//listing all subcategories present in category.
router.get('/list/:id/listsubcategoies', function(req, res) {
    var data ={};
    category.findById(req.params.id, function(err, category) {
        data.category = category;
        if (err) { console.log(err); }
        if(category){
            subcategory.find({'CategoryId':category.id}, function(err, sbcategory){
                data.subcat = sbcategory;
                //category['subcat'] = sbcategory;
                //console.log(category);
                res.json(data);
            });
        }
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
