/**
 * Created by WWL on 2017/9/21.
 */
exports.sql={
  getNotes:'select * from travelnotes ORDER BY id desc',
  getScenic:'SELECT * from scenics a1 LIMIT 0,8',
  getNoteItem:'select * from travelnotes where id = ?'
};
