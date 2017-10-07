var express = require('express');
var router = express.Router();
var admindao = require('./../dao/adminDAO').adminDao;

/* GET home page. */

router.post('/getAll',function (req,res,next) {
  // var check = req.body;
  // console.log(check);
  console.log("===============================");
  admindao.getAll('',function (result) {
    if(result){
      res.json(result)
    }else{
      res.json({"stateCode":0})
    }
    // console.log(result);
  });
});
router.post('/isCheck',function (req,res,next) {
  var check = req.body;
  console.log(check);
  console.log("===============================");
  admindao.isCheck(check,function (result) {
    if(result){
      res.json(result.affectedRows)
    }else{
      res.json({"stateCode":0})
    }
    // console.log(result);
  });
});
// router.post('/noCheck',function (req,res,next) {
//   var check = req.body;
//   console.log(check);
//   console.log("===============================");
//   admindao.noCheck(check,function (result) {
//     if(result){
//       res.json(result)
//     }else{
//       res.json({"stateCode":''})
//     }
//     // console.log(result);
//   });
// });

module.exports = router;
