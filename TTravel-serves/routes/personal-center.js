var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var personaldao = require('./../dao/personalDAO').perDao;

/* GET home page. */
router.get('/provinces', function(req, res, next) {
  personaldao.getProvinces(function (result) {
    res.json({"province":result})
    // console.log(result);
  });
});
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

router.post('/notes',function (req,res,next) {
  var notesBody = "";
  req.on('data', function (chunk) {
    notesBody += chunk;
    // console.log(notesBody);
  });
  req.on('end', function () {
    personaldao.getNotes(notesBody,function (result) {
      if(result){
        res.json(result)
      }
      console.log(result);
    });
  });
});

router.post('/addNotes',function (req,res,next) {
  console.log('here');
  var notesBody = "";
  req.on('data', function (chunk) {
    notesBody += chunk;
    console.log(notesBody);
  });
  req.on('end', function () {
    personaldao.addNotes(notesBody,function (result) {
      if(result){
        res.json(result)
      }
      console.log(result);
    });
  });
})
module.exports = router;
