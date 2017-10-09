var express = require('express');
var router = express.Router();
var admindao = require('./../dao/adminDAO').adminDao;
var util = require('./../utils/util');

/* GET home page. */

router.post('/login', function (req, res) {
  var user = req.body;
  if (user.telephone && user.password) {
    console.log(user);
    admindao.getPasswordById(user.telephone, function (result) {
      console.log('登录返回数据');
      console.log(result);
      if (result == 'e004') {
        res.json({"stateCode": result});
      } else {
        if (result) {
          if (result.length == 0) {
            res.json({"stateCode": 3});
          } else {
            if (result.password == util.MD5(user.password)) {
              res.json({"stateCode": 1});
              console.log('登录成功!');
            } else {
              res.json({"stateCode": 2});
            }
          }
        }
      }

    })
  }
})
router.post('/getAll', function (req, res, next) {
  // var check = req.body;
  // console.log(check);
  console.log("===============================");
  admindao.getAll('', function (result) {
    if (result) {
      res.json(result)
    } else {
      res.json({"stateCode": 0})
    }
    // console.log(result);
  });
});
router.post('/isCheck', function (req, res, next) {
  var check = req.body;
  console.log(check);
  console.log("===============================");
  admindao.isCheck(check, function (result) {
    if (result) {
      res.json(result.affectedRows)
    } else {
      res.json({"stateCode": 0})
    }
    // console.log(result);
  });
});


module.exports = router;
