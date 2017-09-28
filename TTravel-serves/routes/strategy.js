/**
 * Created by WWL on 2017/9/27.
 */
var express = require('express');
var router = express.Router();
var strategyDao = require('./../dao/strategyDAO').strategyDao;

/* GET home page. */

router.post('/getStrategy',function (req,res,next) {
  strategyDao.getStrategys('',function (result) {
    if(result){
      res.json(result)
    }else{
      res.json({"stateCode":''})
    }
    console.log(result);
    console.log('==================getStrategy=====================');
  });
});
router.post('/strategyDetails',function (req,res,next) {
  var id = req.body.styategyId;
  console.log(id);
  if(id){
    strategyDao.getStrategyDetails(id,function (result) {
      if(result){
        // console.log(result);
        res.json(result);
      }
    })
  }
});

module.exports = router;
