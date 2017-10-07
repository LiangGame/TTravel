/**
 * Created by WWL on 2017/9/21.
 */
exports.sql= {
  getNotes: 'SELECT * FROM travelnotes where travelnotes.`check` = 1 ORDER BY pubtime DESC LIMIT 0,?',
  getScenic: 'SELECT * from scenics WHERE cityname LIKE ?  LIMIT 0,500 ',
  getNoteItem: 'select * from travelnotes where id = ? and travelnotes.`check` = 1',
  getHotNotes: 'SELECT * FROM travelnotes where travelnotes.`check` = 1 ORDER BY travelnotes.like DESC LIMIT 0,3 ',
}
