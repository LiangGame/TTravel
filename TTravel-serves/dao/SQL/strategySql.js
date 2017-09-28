/**
 * Created by WWL on 2017/9/27.
 */
exports.sql={
  getStrategys:'SELECT * FROM strategys ORDER BY id DESC LIMIT 0,12',
  getStrategyDetails:'SELECT * FROM strategys WHERE id = ?'
};
