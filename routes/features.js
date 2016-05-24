var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Feature = mongoose.model('Feature');

router.post('/createFeature',createFeature);
router.get('/listallFeatures',showAllFeatures);
router.get('/delete/:id',deleteFeature);
router.get('/edit/:id',editfeature);


router.get('/addFeature', function(req, res) {

    res.render('featureAddnew.html');
});


function editfeature(req, res){

    if(req.query.update!= undefined){
        console.log(req.query);
       if(req.query.update == 'update'){
         Feature.update({_id:req.params.id}, {$set:{Key:req.query.Key,
            Value :req.query.Value,
            Active :"True" }}, {w:1}, function(err, result) {
              if(err){
                console.log(err.stack);
              }
              res.redirect('/features/listallFeatures');
            });
        } 
    }else{
        Feature.findOne({"_id":req.params.id},function(err, feature){
        if(err){
            res.render({"msg" : "Something went wrong"});
        }
        res.render('featuresEdit.html', {"feature": feature});
        });
    }

}


function deleteFeature(req,res){

       if(req.query.Delete == 'Delete'){

        console.log(req.query);
         Feature.remove({_id:req.params.id},function(err, feature){
                if(err){
                 console.log(err.stack);
                    }
                console.log("feature delted");

            res.redirect('/features/listallFeatures');
                });
 
            } 
    else{
        Feature.findOne({"_id":req.params.id},function(err, feature){
        if(err){
            res.render({"msg" : "Something went wrong"});
        }
        res.render('featureDelete.html', {"feature": feature});
       });
    }
}
function createFeature(req,res){
	var feature = new Feature(req.body);
    feature.save(function(err, feature){
     	if(err){
        console.log("feature not added");
        res.statusCode = 404;
     		}
     	if(feature){
     	console.log("Feature added"+ feature);
        res.redirect('/features/listallFeatures');
       
             }
     });
}


function showAllFeatures(req,res){
  Feature.find({}, function(err, features){
    res.render('listFeatures.html', {"features" : features});
  });
}


module.exports = router;
