/**
 * Created by WWL on 2017/9/11.
 */
var pool=require('./db_pool').pool;
var userSql=require('./SQL/userSql').sql;
exports.userDao={
  getPasswordById:function (telephone,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(userSql.getPasswordById,[telephone],function (error,result) {
        if(error){
          console.log(error.message+' from getpasswordbyid');
          callback('e004');
          return;
        }
        console.log(result[0]+'----->>>>userDAO.getPwd');
        callback(result);
        client.release();
      })
    })
  },
  addUser:function (user,callback) {
    this.getPasswordById(user.telephone,function (result) {
      console.log(result);
      if(result.length==0){
        pool.getConnection(function (error,client) {
          if(error){
            return
          }
          client.query(userSql.addUser,[user.telephone,user.userName,user.userPassword,1,1],function (error,result) {
            if(error){
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
  getUserIcon:function (telephone,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(userSql.getUserIcon,[telephone],function (error,result) {
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
    pool.getConnection(function (error,client) {
      if(error){
        callback('e004');
        return;
      }
      client.query(userSql.addUserIcon,[telephone,iconName],function (error,result) {
        if(error){
          console.log(error.message+' from getpasswordbyid');
          callback('e004');
          return;
        }

        callback(result[0][0].result);
        // console.log(result[0][0].result);
        client.release();
      })
    })
  },
  updateUser:function (user,callback) {
    var birthday = user[0].years+'-'+user[0].month+'-'+user[0].day;
    this.getPasswordById(user[1].telephone,function (result) {
      // console.log(result.length);
      if(result.length==1){
        pool.getConnection(function (error,client) {
          if(error){
            return;
          }
          client.query(userSql.updateUser,[user[0].userName,user[0].userSex,birthday,1,user[0].Signature,user[1].telephone],function (error,result) {
            if(error){
              console.log(error.message);
              callback('e004');
              return;
            }
            // console.log(result);
            callback(result.affectedRows);
            client.release();
          })
        })
      }else {
        callback('5');
      }
    })
  }
}
