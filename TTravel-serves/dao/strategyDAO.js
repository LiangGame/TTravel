/**
 * Created by WWL on 2017/9/27.
 */
var pool=require('./db_pool').pool;
var strategySql=require('./SQL/strategySql').sql;
exports.strategyDao={
  getStrategys:function (e,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(strategySql.getStrategys,function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>strategy >>>> getStrategys');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>strategyDAO>>>>getStrategys');
        client.release();
      })
    })
  },
  getStrategyDetails:function (id,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(strategySql.getStrategyDetails,[id],function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>strategy >>>> getStrategyDetails');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>strategyDAO>>>>getStrategyDetails');
        client.release();
      })
    })
  },
}
