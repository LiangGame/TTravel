var express = require('express');
var router = express.Router();
var indexdao = require('./../dao/indexDAO').indexDao;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getNotes',function (req,res,next) {
  indexdao.getNotes('',function (result) {
      if(result){
        res.json(result)
      }else{
        res.json({"stateCode":''})
      }
      // console.log(result);
    });
});
router.post('/getScenic',function (req,res,next) {
  console.log('here');
  indexdao.getScenic('',function (result) {
    if(result){
      res.json(result)
    }else{
      res.json({"stateCode":''})
    }
    // console.log(result);
  });
})
module.exports = router;
