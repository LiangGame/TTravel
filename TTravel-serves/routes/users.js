var express = require('express');
var querystring = require('querystring');
var formidable = require('formidable');
var fs = require('fs');

var userdao = require('./../dao/userDAO').userDao;
var util = require('./../utils/util');

//产生令牌
var jwt = require('jwt-simple');
var moment = require('moment');
var ct = require('./../utils/checkToken');

var router = express.Router();
var AVATAR_UPLOAD_FOLDER = '/uploads/';
var userImgs = '/userImgs/';
router.get('/login', function (req, res, next) {
  var user = req.query;
  console.log('here');
  console.log(user);
  res.json({"stateCode": 3});
});
// 登录
router.post('/login', function (req, res, next) {
  var user = req.body;
  if (user.telephone&&user.password) {
    console.log(user);
    userdao.getPasswordById(user.telephone, function (result) {
      if (result == 'e004') {
        res.json({"stateCode": result});
      } else {
        if(result){
          if (result.length == 0) {
            res.json({"stateCode": 3});
          } else {
            if (result.userPassword == util.MD5(user.password)) {
              //产生令牌
              var _token = util.createUnique();
              console.log(_token);
              userdao.createToken(user.telephone, _token, function (result) {
                if (result.affectedRows == 1) {
                  userdao.getUser(user.telephone, function (result) {
                    if (result) {
                      var users = result;
                      //产生令牌
                      var expires = moment().add(7, 'days').valueOf();
                      var token = jwt.encode({
                        iss: user.telephone,
                        exp: expires
                      }, util.secret);
                      res.json({"stateCode": 1, "_token": _token, "users": users, token: token});
                      console.log('登录成功!');
                    }
                  });
                } else {
                  res.json({"stateCode": 2});
                }
              })
            }
          }
        }

      }
    })
  }
});
// 上传头像
router.post('/upload', function (request, response, next) {
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';
  form.parse(request, function (err, fields, files) {
    if (err) {
      response.locals.error = err;
      response.json({"stateCode": 'e005'});
      return;
    }

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
    if (extName.length == 0) {
      response.json({"stateCode": 'e005'});
      return;
    } else {
      form.uploadDir = "../public" + AVATAR_UPLOAD_FOLDER;     //设置上传目录
      form.keepExtensions = true;     //保留后缀
      form.maxFieldsSize = 3 * 1024;   //文件大小
      var avatarName = util.createUnique() + '.' + extName;
      // 'public/uploads/d23242343242.jpg'
      var newPath = form.uploadDir + avatarName;
      // console.log("newpath---"+newPath);
      // fs.renameSync(files.user_icon.path, newPath);  //重命名
      fs.readFile(files.uploadedfile.path, function (error, data) {
        if (error) {
          return;
        }
        fs.writeFile(newPath, data, function (error) {
          if (error) {
            return;
          }
          userdao.addUserIcon(fields.telephone, avatarName, function (result) {
            if (result.affectedRows == 1) {
              response.json(result);
              console.log('上传头像成功!');
            } else {
              response.json({"stateCode": 0});
            }
          })
        })
      });
    }
  })


});
// 上传照片
router.post('/upImgs', function (request, response, next) {
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';
  form.parse(request, function (err, fields, files) {
    if (err) {
      response.locals.error = err;
      response.json({"stateCode": 'e005'});
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
    if (extName.length == 0) {
      response.json({"stateCode": 'e005'});
      return;
    } else {
      form.uploadDir = "../public" + userImgs;     //设置上传目录
      form.keepExtensions = true;     //保留后缀
      form.maxFieldsSize = 3 * 1024;   //文件大小
      var avatarName = util.createUnique() + '.' + extName;
      // 'public/uploads/d23242343242.jpg'
      var newPath = form.uploadDir + avatarName;
      // console.log("newpath---"+newPath);
      // fs.renameSync(files.user_icon.path, newPath);  //重命名
      fs.readFile(files.uploadedfile.path, function (error, data) {
        if (error) {
          return;
        }
        fs.writeFile(newPath, data, function (error) {
          if (error) {
            return;
          }
          userdao.addUserImg(fields.userId, avatarName, function (result) {
            if (result.affectedRows == 1) {
              response.json(result);
              console.log('上传照片成功!');
            } else {
              response.json({"stateCode": 0});
              console.log('上传照片失败!');
            }
          })
        })
      });
    }
  })
});
// 注册
router.post('/register', function (req, res, next) {
  var user = req.body;
  if (user) {
    if (user.telephoone == '' || user.password == '' || user.userName == '') {
      res.json({"stateCode": '0'});
      return;
    }
    user.password = util.MD5(user.password);
    console.log(user.password);
    userdao.addUser(user, function (result) {
      if (result) {
        if (result == 'e004') {
          res.json({"stateCode": result});
          console.log('数据库错误!');
        } else if (result == '1') {
          res.json({"stateCode": '6'});
          console.log('注册成功!');
        } else if (result == '0') {
          res.json({"stateCode": '5'});
          console.log('注册失败!');
        } else if (result == '5') {
          res.json({"stateCode": '7'})
          console.log('注册用户已存在!');
        }
      }
    });
  }
  // })
});
// 获取用户头像
router.post('/getUserIcon', ct.checkToken, function (req, res, next) {
  var user_telephone = req.body.telephone;
  if (user_telephone) {
    userdao.getUser(user_telephone, function (result) {
      if (result.length == 0) {
        res.json({"icon": "icon_default.jpg"});
        console.log('获取头像失败!');
      } else {
        res.json(result);
        console.log(result);
        console.log('获取头像成功!');
      }
    })
  }
});
router.post('/getUser',ct.checkToken,function (req,res,next) {
  var user_telephone = req.body.telephone;
  if (user_telephone) {
    userdao.getUser(user_telephone, function (result) {
      if (result.length == 0) {
        res.json({"icon": "icon_default.jpg"});
        console.log('获取用户基本资料失败!');
      } else {
        res.json(result);
        console.log('获取用户基本资料成功!');
      }
    })
  }
});
// 修改个人信息
router.post('/updateUser', ct.checkToken, function (req, res, next) {
  var user = req.body;
  console.log(user);
  if (user) {
    userdao.updateUser(user, function (result) {
      if (result) {
        if (result.stateCode == 'e004') {
          res.json({"stateCode": result});
          console.log('数据库错误!');
        } else if (result.stateCode == '1') {
          res.json({"stateCode": '6', "userName": result.userName});
          console.log('修改个人信息成功!');
        } else if (result.stateCode == '0') {
          res.json({"stateCode": '5'});
          console.log('修改个人信息失败!');
        }
      }
    });
  }
});
// 游记点赞
router.post('/notesLike', ct.checkToken, function (req, res, next) {
  var likeInfo = req.body;
  if (likeInfo) {
    userdao.setLike(likeInfo, function (result) {
      if (result) {
        if (result == 'e004') {
          res.json(result); // 数据错误
          console.log('数据库错误!');
        } else if (result.affectedRows == '1') {
          res.json({"stateCode": "L001"});
          console.log('点赞成功!');
        } else if (result.affectedRows == '0') {
          res.json({"stateCode": "L002"});
          console.log('点赞失败!');
        }
      }
    });
  }
});
// 获取点赞信息
router.post('/getNotesLike', function (req, res, next) {
  var likeInfo = req.body;
  if (likeInfo) {
    userdao.getNOtesLike(likeInfo, function (result) {
      if (result) {
        res.json(result);
        console.log('获取点赞信息成功!');
      }
    });
  }
});
// 游记收藏
router.post('/notesCollect', ct.checkToken, function (req, res, next) {
  var likeInfo = req.body;
  if (likeInfo) {
    userdao.setCollect(likeInfo, function (result) {
      if (result) {
        if (result == 'e004') {
          res.json(result); // 数据错误
          console.log('数据库错误!');
        } else if (result.affectedRows == '1') {
          res.json({"stateCode": "L001"});
          console.log('收藏成功!');
        } else if (result.affectedRows == '0') {
          res.json({"stateCode": "L002"});
          console.log('收藏失败!');
        }
      }
    });
  }
});
// 获取游记收藏信息
router.post('/getNotesCollect', function (req, res, next) {
  var likeInfo = req.body;
  if (likeInfo) {
    userdao.getNOtesCollect(likeInfo, function (result) {
      if (result) {
        res.json(result);
        console.log('获取游记收藏信息成功!');
      }
    });
  }
});
//游记评论
router.post('/notesComment',function (req,res,next) {
  var commentInfo = req.body;
  if (commentInfo) {
    userdao.notesComment(commentInfo, function (result) {
      if (result) {
        if(result.affectedRows == 1){
          res.json({"statsCode":'C001'});
          console.log('游记评论成功!');
        }else {
          res.json({"statsCode":'C002'});
          console.log('游记评论失败!');
        }
      }
    });
  }
});
// 获取评论信息
router.post('/getNotesComment',function (req,res,next) {
  var commentInfo = req.body;
  if (commentInfo) {
    userdao.getNotesComment(commentInfo, function (result) {
      if (result) {
        res.json(result);
        console.log('获取评论信息成功');
      }
    });
  }
});
// 删除评论
router.post('/deleteComment',function (req,res,next) {
  var commentId = req.body.commentId;
  if (commentId) {
    userdao.deleteNotesComment(commentId, function (result) {
      if (result) {
        res.json(result.affectedRows);
        console.log('删除评论成功');
      }
    });
  }
});
// 获取用户积分
router.post('/getCredits', ct.checkToken,function (req,res,next) {
  var userId = req.body.telephone;
  console.log('获取用户积分--->>> telephone: '+userId);
  if (userId) {
    userdao.getCredits(userId, function (result) {
      if (result) {
        res.json(result);
        console.log('返回用户积分---->>>getCredits');
      }
    });
  }
});
// 增加积分
router.post('/addCredits',ct.checkToken,function (req,res,next) {
  var userId = req.body.telephone;
  var creits = req.body.creits;
  console.log('用户--->>> telephone: '+userId);
  console.log('积分--->>> creits: '+creits);
  if (userId&&creits) {
    userdao.addCredits(userId,creits,function (result) {
      if (result) {
        res.json(result);
        console.log('增加积分成功');
      }
    });
  }
})


module.exports = router;
