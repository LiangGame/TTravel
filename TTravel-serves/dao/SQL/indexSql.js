/**
 * Created by WWL on 2017/9/21.
 */
exports.sql={
  getNotes:'SELECT * FROM travelnotes ORDER BY pubtime DESC LIMIT 0,?',
  getScenic:'SELECT * from scenics a1 LIMIT 0,8',
  getNoteItem:'select * from travelnotes where id = ?'
};
