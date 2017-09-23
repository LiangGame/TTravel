/**
 * Created by WWL on 2017/9/20.
 */
var pool=require('./db_pool').pool;
var scenicSql=require('./SQL/scenicSql').sql;
exports.scenicDao={
  getScenic:function (body,callback) {
    console.log(body);
    console.log('>>>>>>>>>>>>>>>>>scenicDAO');
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(scenicSql.getScenics,['%'+body.cityName+'%'],function (error,result) {
        if(error){
          console.log(error.message+' from getScenic');
          callback('e004');
          return;
        }
        console.log(result);
        console.log('----->>>>userDAO.getScenic');
        callback(result);
        client.release();
      })
    })
  }
}
