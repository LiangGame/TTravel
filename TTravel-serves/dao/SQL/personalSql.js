/**
 * Created by WWL on 2017/9/14.
 */
exports.sql={
  getProvince:'select id,provincename from province',
  getcitys:'select * from address where provincename=?',
  gitcity:'select * from address where cityid = ?',
  // gitcityId:'select * from address where cityname = ?',
  getNotes:'select * from travelNotes',
  addNotes:'insert into user_travelnotes(title,content,user_id) values(?,?,?)'
};
