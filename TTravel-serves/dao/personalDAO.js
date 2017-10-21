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
        // console.log(result);
        client.release()  ;
      })
    })
  },
// 获取用户发表的游记
  getNotes:function (id,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(personalSql.getNotes,[id.userId],function (error,result) {
        if(error){
          console.log(error.message+' from getNotes');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>personalDAO>>>>getNOtes');
        client.release();
      })
    })
  },

  addNotes:function (body,callback) {
    pool.getConnection(function (error,client) {
      if (error) {
        return
      }
      // console.log('>>>>>>>>>>>>>>>>addNotes>>>>>>>>personalDAO');
      client.query(personalSql.addNotes,[body.title,body.content,body.id],function (error, result) {
        if (error) {
          console.log(error.message + ' from addNotes');
          callback('e004');
          return;
        }
          callback(result.affectedRows)
        // console.log(result.affectedRows);
        client.release();
      })
    })
  },
  getUserImages:function (userId,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(personalSql.getUserImages,[userId],function (error,result) {
        if(error){
          console.log(error.message+' from getUserImages');
          callback('e004');
          return;
        }
        callback(result);
        // console.log(result);
        // console.log('>>>>>>>>>>>>>>>>>>>>>>personalDAO>>>>getUserImages');
        client.release();
      })
    })
  },
  // 添加足迹
  addFootprint:function (body,callback) {
    pool.getConnection(function (error,client) {
      if (error) {
        return
      }
      // console.log('>>>>>>>>>>>>>>>>addFootprint>>>>>>>>personalDAO');
        client.query(personalSql.addFootprint,[body.scenicId,body.userId],function (error, result) {
        if (error) {
          console.log(error.message + ' from addFootprint');
          callback('e004');
          return;
        }
        callback(result.affectedRows)
        // console.log(result.affectedRows);
        client.release();
      })
    })
  },
  // 获取游记
  getAllFootPrint:function (userId,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(personalSql.getAllFootPrint,[userId],function (error,result) {
        if(error){
          console.log(error.message+' from getAllFootPrint');
          callback('e004');
          return;
        }
        callback(result);
        client.release();
      })
    })
  },
  // 获取用户收藏游记
  getUserCollect:function (userId,callback) {
    pool.getConnection(function (error,client) {
      if(error){
        return
      }
      client.query(personalSql.getUserCollect,[userId],function (error,result) {
        if(error){
          console.log(error.message+' from getUserCollect');
          callback('e004');
          return;
        }
        callback(result);
        client.release();
      })
    })
  }
}
