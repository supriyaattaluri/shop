var express=require('express');
var router = express.Router();
var fs = require('fs');
var multer=require('multer');
router.use(multer({dest:'/home/pcs-03/Desktop/supriya/shop/public/'}).any());

router.post('/uploadfile',uploadFile);

function uploadFile(req,res){
 
 console.log(req.body);
    console.log(req.files[0]);// for first file information on console
    //console.log(req.files);// for all inserted files information on console.

    res.send('sucess');

}
module.exports = router;