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
        callback(result[0]);
        client.release();
      })
    })
  },
  addUser:function (user,callback) {
    this.getPasswordById(user.telephone,function (result) {
      if(!result){
        pool.getConnection(function (error,client) {
          if(error){
            console.log(error);
            return
          }
          client.query(userSql.addUser,[user.telephone,user.userName,user.password,1,0],function (error,result) {
            if(error){
              console.log(error);
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
        client.release();
      })
    })
  },
  addUserImg:function (userId,imgName,callback) {
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
        client.release();
      })
    })
  },
  updateUser:function (user,callback) {
    if(user[0].years&&user[0].month&&user[0].day){
      var birthday = user[0].years+'-'+user[0].month+'-'+user[0].day;
    }
    this.getPasswordById(user[1].telephone,function (result) {
      var user_name = result.userName;
      if(result){
        if(result.id!=''||result.id!=null){
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
              callback({"stateCode":result.affectedRows,"userName":user_name});
              client.release();
            })
          })
        }
      }else {
        callback('5');/*改用不存在*/
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
          callback(result);
          client.release();
        })
      })
    }
  },
  deleteNotesComment:function (commentId,callback) {
    if(commentId){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.deleteNotesComment,[commentId],function (error,result) {
          if(error){
            console.log(error.message+' from deleteNotesComment');
            callback('e004');// 数据库错误
            return;
          }
          callback(result);
          client.release();
        })
      })
    }
  },
  getCredits:function (userId,callback) {
    if(userId){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.getCredits,[userId],function (error,result) {
          if(error){
            console.log(error.message+' from getCredits');
            callback('e004');// 数据库错误
            return;
          }
          callback(result);
          client.release();
        })
      })
    }
  },
  addCredits:function (userId,creits,callback) {
    if(userId&&creits){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.addCredits,[creits,userId],function (error,result) {
          if(error){
            console.log(error.message+' from addCredits');
            callback('e004');// 数据库错误
            return;
          }
          callback(result);
          client.release();
        })
      })
    }
  },
  updateTopInfo:function (notesId,topInfo,callback) {
    if(notesId&&topInfo){
      pool.getConnection(function (error,client) {
        if(error){
          return;
        }
        client.query(userSql.updateTopInfo,[topInfo.starTime,topInfo.useTime,topInfo.cost,topInfo.person,notesId],function (error,result) {
          if(error){
            console.log(error.message+' from updateTopInfo');
            callback('e004');// 数据库错误
            return;
          }
          callback(result);
          client.release();
        })
      })
    }
  }
}
