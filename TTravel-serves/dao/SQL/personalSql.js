/**
 * Created by WWL on 2017/9/14.
 */
exports.sql={
  getProvince:'select id,provincename from province',
  getcitys:'select * from address where provincename=?',

  getNotes:'select * from travelNotes'
};
