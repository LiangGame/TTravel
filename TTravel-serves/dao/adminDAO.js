var pool=require('./db_pool').pool;
var adminSql=require('./SQL/adminSql').sql;
exports.adminDao={

  getPasswordById:function (telephone,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        console.log(error)
        return
      }
      client.query(adminSql.getPasswordById,[telephone],function (error,result) {
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
  getAll:function (e,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(adminSql.getAll,'',function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>admin >>>> getAll');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        console.log('>>>>>>>>>>>>>>>>>>>>>>adminDAO>>>>getAll');
        client.release();
      })
    })
  },
  isCheck:function (check,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(adminSql.check,[check.type,check.notesId],function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>admin >>>> isCheck');
          callback('e004');
          return;
        }
        callback(result);
        console.log(result);
        console.log('>>>>>>>>>>>>>>>>>>>>>>adminDAO>>>>isCheck');
        client.release();
      })
    })
  },

}
