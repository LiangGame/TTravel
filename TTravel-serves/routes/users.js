var express = require('express');
var querystring = require('querystring');
var formidable=require('formidable');
var fs=require('fs');

var userdao = require('./../dao/userDAO').userDao;
var util = require('./../utils/util');

//产生令牌
var jwt=require('jwt-simple');
var moment = require('moment');
var ct = require('./../utils/checkToken');

var router = express.Router();
var AVATAR_UPLOAD_FOLDER='/uploads/';
router.get('/login', function (req, res, next) {
  var user = req.query;
  console.log('here');
  console.log(user);
  res.json({"stateCode": 3});
});
router.post('/login', function (req, res, next) {
  var user = req.body;
  if (user) {
    console.log(user);
    userdao.getPasswordById(user.telephone, function (result) {
      console.log(result[0].userName+'----->>>>getPwd');
      var userName = result[0].userName;
      if (result == 'e004') {
        res.json({"stateCode": result});
      } else {
        if (result.length == 0) {
          res.json({"stateCode": 3});
        } else {
          if (result[0].userPassword == util.MD5(user.password)) {

            //产生令牌
            var _token = util.createUnique();
            console.log(_token);
            userdao.createToken(user.telephone, _token, function (result) {
              // console.log(result[0].userName);
              if (result.affectedRows == 1) {
                var expires = moment().add(7,'days').valueOf();
                var token = jwt.encode({
                  iss:user.telephone,
                  exp:expires
                },util.secret);
                res.json({"stateCode": 1, "_token": _token,"userName":userName,token:token});
              }
            });
          } else {
            res.json({"stateCode": 2});
          }
        }
      }
    })
  }
});
router.post('/upload', function (request, response, next) {
  console.log('here');
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';
  form.parse(request, function (err, fields, files) {
    // console.log(fields);
    // console.log('here'+'----------/upload');
    if (err) {
      response.locals.error = err;
      response.json({"stateCode":'e005'});
      return;
    }

    // console.log(files.uploadedfile);
    var extName = '';  //后缀名
    switch (files.uploadedfile.type) {
      case 'image/jpeg':
        extName = 'jpeg';
        break;
      case 'image/jpg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }
    if(extName.length == 0){
      response.json({"stateCode":'e005'});
      return;
    } else{
      form.uploadDir = "../public"+AVATAR_UPLOAD_FOLDER;     //设置上传目录
      form.keepExtensions = true;     //保留后缀
      form.maxFieldsSize = 3 * 1024;   //文件大小
      var avatarName = util.createUnique() + '.' + extName;
      // 'public/uploads/d23242343242.jpg'
      var newPath = form.uploadDir + avatarName;
      // console.log("newpath---"+newPath);
      // fs.renameSync(files.user_icon.path, newPath);  //重命名
      fs.readFile(files.uploadedfile.path,function (error,data) {
        if(error){
          return;
        }
        fs.writeFile(newPath,data,function (error) {
          if(error){
            return;
          }
          userdao.addUserIcon(fields.telephone,avatarName,function (result) {
            // console.log(fields.telephone);
            // console.log(avatarName);
            if(result.affectedRows==1){
              response.json(result);
            }else{
              response.json({"stateCode":0});
            }
          })
        })
      });
      /*fs.rename(files.uploadedfile.path, newPath,function (error) {
        console.log(files.uploadedfile.path);
        console.log(newPath);
        console.log(error);
        if(error){
          console.log('here'+'>>>>>>>>>>>>>>>files');

          response.json({"stateCode":'e005'});
          return
        }
        userdao.addUserIcon(fields.userId,avatarName,function (result) {
          if(result==1){
            response.json({"stateCode":1});
          }else{
            response.json({"stateCode":0});
          }
        })
      })*/

    }

  })



});
router.post('/register', function (req, res, next) {
  var user = req.body;
  console.log(user);
  if(user){
      if(user.telephoone == '' || user.password == ''){
        res.end('0');
        return;
      }
      user.password = util.MD5(user.password);
      console.log(user.password);
      userdao.addUser(user,function (result) {
        if(result){
          if(result == 'e004'){
            res.json({"stateCode":result});
          }else if(result == '1'){
            res.json({"stateCode":'6'});
          }else if(result == '0'){
            res.json({"stateCode":'5'});
          }else if(result == '5'){
            res.json({"stateCode":'7'})
          }
        }
      });
    }
  // })
});

router.post('/getUserIcon',ct.checkToken,function (req, res, next) {
  var user_telephone=req.body.telephone;
  if(user_telephone){
    userdao.getUser(user_telephone,function (result) {
      console.log(result);
      console.log('>>>>>>>getUser');
      if(result.length==0){
        res.json({"icon":"icon_default.jpg"});
      }else {
        res.json(result);
      }
    })
  }
});

router.post('/updateUser',ct.checkToken,function (req,res,next) {
  var user = req.body;
  console.log(user);
  if(user) {
    // if(user.telephoone == '' || user.userPassword == ''){
    //   res.end('0');
    //   return;
    // }
    userdao.updateUser(user, function (result) {
      console.log(result);
      // console.log(user);
      console.log('---->>>users');
      if (result) {
        if (result.stateCode == 'e004') {
          res.json({"stateCode": result});
        } else if (result.stateCode == '1') {
          res.json({"stateCode": '6',"userName":result.userName});
        } else if (result.stateCode == '0') {
          res.json({"stateCode": '5'});
        }
      }
    });
  }
})
module.exports = router;
