/**
 * Created by WWL on 2017/9/11.
 */
var pool=require('./db_pool').pool;
var userSql=require('./SQL/userSql').sql;
exports.userDao={
  getPasswordById:function (telephone,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        console.log(error)
        return
      }
      client.query(userSql.getPasswordById,[telephone],function (error,result) {
        if(error){
          console.log(error.message+' from getpasswordbyid');
          callback('e004');
          return;
        }
        // console.log(result[0]);
        // console.log('----->>>>userDAO.getPwd');
        callback(result[0]);
        client.release();
      })
    })
  },
  addUser:function (user,callback) {
    this.getPasswordById(user.telephone,function (result) {
      // console.log(!!result);
      // console.log('<<<<<<>>>>>');
      // console.log(user);
      if(!result){
        pool.getConnection(function (error,client) {
          if(error){
            console.log(error);
            return
          }
          client.query(userSql.addUser,[user.telephone,user.userName,user.password,1,1],function (error,result) {
            if(error){
              console.log(error);
              // console.log('><><><>');
              callback('e004');
              return;
            }
            callback(result.affectedRows);
            client.release();
          })
        })
      }else {
        callback('5');
      }
    })
  },
  createToken:function (telephone,token,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(userSql.createToken,[token,telephone],function (error,result) {
        if(error){
          callback('e004');
          return;
        }

        callback(result);
        client.release();
      })
    })
  },
  getUser:function (telephone,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(userSql.getUser,[telephone],function (error,result) {
        if(error){
          console.log(error.message+' from getpasswordbyid');
          callback('e004');
          return;
        }

        callback(result);
        client.release();
      })
    })
  },
  addUserIcon:function (telephone,iconName,callback) {
    // console.log(telephone);
    // console.log(iconName);
    console.log('>>>>>>>>>>userDAO');
    pool.getConnection(function (error,client) {
      if(error){
        callback('e004');
        return;
      }
      client.query(userSql.addUserIcon,[iconName,telephone],function (error,result) {
        if(error){
          console.log(error.message+' from getpasswordbyid');
          callback('e004');
          return;
        }
        callback({"affectedRows":result.affectedRows,"icon":iconName});

        // console.log({"affectedRows":result.affectedRows,"icon":iconName});
        client.release();
      })
    })
  },
  addUserImg:function (userId,imgName,callback) {
    console.log(userId);
    console.log(imgName);
    console.log('>>>>>>>>>>addUserImg');
    pool.getConnection(function (error,client) {
      if(error){
        callback('e004');
        return;
      }
      client.query(userSql.adduserImg,[imgName,userId],function (error,result) {
        if(error){
          console.log(error.message+' from addUserImg');
          callback('e004');
          return;
        }
        callback({"affectedRows":result.affectedRows,"img":imgName});
        // console.log({"affectedRows":result.affectedRows,"icon":iconName});
        client.release();
      })
    })
  },
  updateUser:function (user,callback) {
    if(user[0].years&&user[0].month&&user[0].day){
      var birthday = user[0].years+'-'+user[0].month+'-'+user[0].day;
    }
    this.getPasswordById(user[1].telephone,function (result) {
      // console.log(result.userName+'>>>>>>updatePwd')
      var user_name = result.userName;
      if(result.length==1){
        pool.getConnection(function (error,client) {
          if(error){
            return;
          }
          client.query(userSql.updateUser,[user[0].userName,user[0].userSex,birthday,user[0].city,user[0].Signature,user[1].telephone],function (error,result) {
            if(error){
              console.log(error.message);
              callback('e004');
              return;
            }
            console.log(result);
            callback({"stateCode":result.affectedRows,"userName":user_name});
            client.release();
          })
        })
      }else {
        callback('5');
      }
    })
  },
  setLike:function (likeInfo,callback) {
    if(likeInfo){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.setLike,[likeInfo.notesId,likeInfo.userId,likeInfo.type],function (error,result) {
          if(error){
            console.log(error.message+' from setLike');
            callback('e004');// 数据库错误
            return;
          }
          callback(result);
          client.release();
        })
      })
    }
  },
  getNOtesLike:function (likeInfo,callback) {
    if(likeInfo){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.getNotesLike,[likeInfo.notesId,likeInfo.userId,likeInfo.type],function (error,result) {
          if(error){
            console.log(error.message+' from setLike');
            callback('e004');// 数据库错误
            return;
          }
          // console.log(result);
          // console.log('....>>>>getNOtesLike');
          callback(result);
          client.release();
        })
      })
    }
  },
  setCollect:function (likeInfo,callback) {
    if(likeInfo){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.setCollect,[likeInfo.notesId,likeInfo.userId,likeInfo.type],function (error,result) {
          if(error){
            console.log(error.message+' from setLike');
            callback('e004');// 数据库错误
            return;
          }
          callback(result);
          client.release();
        })
      })
    }
  },
  getNOtesCollect:function (likeInfo,callback) {
    if(likeInfo){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.getNotesCollect,[likeInfo.notesId,likeInfo.userId,likeInfo.type],function (error,result) {
          if(error){
            console.log(error.message+' from setLike');
            callback('e004');// 数据库错误
            return;
          }
          // console.log(result);
          // console.log('....>>>>getNOtesLike');
          callback(result);
          client.release();
        })
      })
    }
  },
  notesComment:function (commentInfo,callback) {
    if(commentInfo){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.setComment,[commentInfo.comment,commentInfo.notesId,commentInfo.userId,commentInfo.type],function (error,result) {
          if(error){
            console.log(error.message+' from commentInfo');
            callback('e004');// 数据库错误
            return;
          }
          callback(result);
          client.release();
        })
      })
    }
  },
  getNotesComment:function (commentInfo,callback) {
    // console.log(commentInfo.id);
    if(commentInfo){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.getNotesComment,[commentInfo.notesId,commentInfo.notesId],function (error,result) {
          if(error){
            console.log(error.message+' from getNotesComment');
            callback('e004');// 数据库错误
            return;
          }
          console.log(result);
          console.log('....>>>>getNotesComment');
          callback(result);
          client.release();
        })
      })
    }
  }
}
