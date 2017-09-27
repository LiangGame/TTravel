/**
 * Created by WWL on 2017/9/21.
 */
var pool=require('./db_pool').pool;
var indexSql=require('./SQL/indexSql').sql;
exports.indexDao={
  getNotes:function (e,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(indexSql.getNotes,function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>index >>>> getNotes');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>indexDAO>>>>getNOtes');
        client.release();
      })
    })
  },
  getScenic:function (e,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(indexSql.getScenic,function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>index >>>> getScenic');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>indexDAO>>>>getScenic');
        client.release();
      })
    })
  },
  getNoteItem: function (id, callback) {
    if (id) {
      pool.getConnection(function (error, client) {
        if (error) {
          return
        }
        client.query(indexSql.getNoteItem,[id],function (error, result) {
          if (error) {
            console.log(error.message + ' from getScenicItem');
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
}
