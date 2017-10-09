/**
 * Created by WWL on 2017/9/27.
 */
exports.sql={
  getStrategys:'SELECT * FROM strategys ORDER BY id LIMIT 0,100',
  getStrategyDetails:'SELECT * FROM strategys WHERE id = ?'
};
