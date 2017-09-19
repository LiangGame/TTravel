/**
 * Created by WWL on 2017/9/14.
 */
var pool=require('./db_pool').pool;
var personalSql=require('./SQL/personalSql').sql;
exports.perDao={
  getProvinces:function (callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(personalSql.getProvince,function (error,result) {
        if(error){
          console.log(error.message+' from getProvince');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        client.release()  ;
      })
    })
  },
  getcitys:function (provinceName,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(personalSql.getcitys,[provinceName],function (error,result) {
        if(error){
          console.log(error.message+' from getCitys');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        client.release();
      })
    })
  },
  getCity:function (cityId,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(personalSql.gitcity,[cityId],function (error,result) {
        if(error){
          console.log(error.message+' from getCity');
          callback('e004');
          return;
        }
        callback(result);
        console.log(result);
        client.release()  ;
      })
    })
  },

  getNotes:function (id,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(personalSql.getNotes,function (error,result) {
        if(error){
          console.log(error.message+' from getNotes');
          callback('e004');
          return;
        }
        callback(result);
        console.log(result);
        client.release();
      })
    })
  },

  addNotes:function (body,callback) {
    pool.getConnection(function (error,client) {
      if (error) {
        return
      }
      client.query(personalSql.addNotes,[body,1],function (error, result) {
        if (error) {
          console.log(error.message + ' from getNotes');
          callback('e004');
          return;
        }
        callback(result);
        console.log(result);
        client.release();
      })
    })
  }
}
