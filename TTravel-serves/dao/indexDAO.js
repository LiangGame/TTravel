/**
 * Created by WWL on 2017/9/21.
 */
var pool=require('./db_pool').pool;
var indexSql=require('./SQL/indexSql').sql;
exports.indexDao={
  getNotes:function (num,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(indexSql.getNotes,[num],function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>index >>>> getNotes');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        console.log('>>>>>>>>>>>>>>>>>>>>>>indexDAO>>>>getNOtes');
        client.release();
      })
    })
  },
  getScenic:function (city,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        console.log(error);
        return
      }
      client.query(indexSql.getScenic,['%'+city+'%'],function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>index >>>> getScenic');
          callback('e004');
          return;
        }
        if(!!result.length){
          // console.log(!!result.length);
          // console.log('当前');
          callback(result);
        }else {
          // console.log('here');
          client.query(indexSql.getScenic,['%'+'北京'+'%'],function (error,result) {
            if(error){
              console.log(error.message+' from >>>>>>index >>>> getScenic');
              callback('e004');
              return;
            }
            if(result){
              // console.log(result);
              console.log('默认');
              callback(result);
            }
          })
        }
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
  },
  getHotNotes:function (e,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(indexSql.getHotNotes,function (error,result) {
        if(error){
          console.log(error.message+' from >>>>>>index >>>> getHotNotes');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        console.log('>>>>>>>>>>>>>>>>>>>>>>indexDAO>>>>getHotNotes');
        client.release();
      })
    })
  }
}
