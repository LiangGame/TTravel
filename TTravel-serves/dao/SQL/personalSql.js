/**
 * Created by WWL on 2017/9/14.
 */
exports.sql={
  getProvince:'select id,provincename from province',
  getcitys:'select * from address where provincename=?',
  gitcity:'select * from address where cityid = ?',
  // gitcityId:'select * from address where cityname = ?',
  getNotes:'select * from travelNotes WHERE telephone = ? ORDER BY id desc',
  addNotes:'insert into user_travelnotes(title,content,pubtime,user_id) values(?,?,now(),?)',
  getUserImages:'SELECT * FROM userimage WHERE  user_id = ?',
};
