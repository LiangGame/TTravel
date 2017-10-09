/**
 * Created by WWL on 2017/9/20.
 */
var pool = require('./db_pool').pool;
var scenicSql = require('./SQL/scenicSql').sql;
exports.scenicDao = {
  getScenic: function (callback) {
    // console.log(body);
    console.log('>>>>>>>>>>>>>>>>>scenicDAO');
    pool.getConnection(function (error, client) {
      if (error) {
        return
      }
      client.query(scenicSql.getScenics, function (error, result) {
        if (error) {
          console.log(error.message + ' from getScenic');
          callback('e004');
          return;
        }
        console.log(result);
        console.log('----->>>>userDAO.getScenic');
        callback(result);
        client.release();
      })
    })
  },
  getScenicItem: function (id, callback) {
    if (id) {
      pool.getConnection(function (error, client) {
        if (error) {
          return
        }
        client.query(scenicSql.getScenicItem, [id], function (error, result) {
          if (error) {
            console.log(error.message + ' from getScenicItem');
            callback('e004');
            return;
          }
          callback(result);
          client.release();
        })
      })
    }
  },
  getHotScenic: function (e, callback) {
    pool.getConnection(function (error, client) {
      if (error) {
        return
      }
      client.query(scenicSql.getHotScenic, function (error, result) {
        if (error) {
          console.log(error.message + ' from getHotScenic');
          callback('e004');
          return;
        }
        callback(result);
        client.release();
      })
    })
  },
  getCitys:function (e,callback) {
    pool.getConnection(function (error, client) {
      if (error) {
        return
      }
      client.query(scenicSql.getCitys, function (error, result) {
        if (error) {
          console.log(error.message + ' from getCitys');
          callback('e004');
          return;
        }
        callback(result);
        client.release();
      })
    })
  }

}
