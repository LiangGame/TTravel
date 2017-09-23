/**
 * Created by WWL on 2017/9/20.
 */
var express = require('express');
var router = express.Router();
var scenicDao = require('./../dao/scenicDAO').scenicDao;

router.get('/getScenic', function (req, res, next) {
  console.log('>>>>>');
  var body = req.query;
  console.log(req.query);
  console.log('<<<<<<<<<<<<<<<<<<<<');
  if(body){
      scenicDao.getScenic(body,function (result) {
        if(result){
          // console.log(result);
          // console.log('>>>>>>>>>>>>>>>>>getScenic');
          res.json(result);
        }
      })
    }
  // var user_telephone=req.body.telephone;
  // userdao.getUser(user_telephone,function (result) {
  //   console.log(result);
  //   console.log('>>>>>>>getUser');
  //   if(result.length==0){
  //     res.json({"icon":"icon_default.jpg"});
  //   }else {
  //     res.json(result);
  //   }
  // })
});

module.exports = router;
