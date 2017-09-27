var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var personaldao = require('./../dao/personalDAO').perDao;
//产生令牌
var jwt=require('jwt-simple');
var moment = require('moment');

var ct=require('./../utils/checkToken');


/* GET home page. */
router.get('/provinces', function(req, res, next) {
  personaldao.getProvinces(function (result) {
    res.json({"province":result})
    // console.log(result);
  });
});
router.get('/getCity',function (req,res,next) {
  personaldao.getCity(req.query.cityId,function (result) {
    res.json(result);
    // console.log(result);
    // console.log('>>>>>>personalRouter');
  })
})
router.post('/citys', function(req, res, next) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    personaldao.getcitys(body,function (result) {
      res.json(result)
      // console.log(result);
    });
  });
});

router.post('/notes',ct.checkToken,function (req,res,next) {
  var notesBody = req.body;
  if(notesBody){
    personaldao.getNotes(notesBody,function (result) {
      if(result){
        res.json(result)
      }
      console.log(result);
    });
  }
});

router.post('/addNotes',ct.checkToken,function (req,res,next) {
  var notesBody = req.body;
  console.log(notesBody);
  console.log('>>>>>>>>>>>>>>>>addNotes');
    personaldao.addNotes(notesBody,function (result) {
      if(result){
        if(result==1  ){
          res.json({"stateCode":'001'});
        }else {
          res.json({"stateCode":'002'});
        }
      }
    });
});

router.post('/getUserImages',ct.checkToken,function (req,res,next) {
  var userId = req.body.userId;
  // console.log(userId);
  // console.log('>>>>>>>>>>>>>>>>getUserImages');
  personaldao.getUserImages(userId,function (result) {
    if(result){
      res.json(result);
      // console.log(result);
    }
  });
})
module.exports = router;
