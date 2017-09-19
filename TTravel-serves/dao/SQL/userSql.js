/**
 * Created by WWL on 2017/9/11.
 */
exports.sql={
  getPasswordById:'select userPassword,userName from user where telephone=?',
  addUser:'insert into user(telephone,username,userPassword,city_id,userlv_id)values(?,?,?,?,?)',
  createToken:'update user set token=? where telephone=?',
  getUser:'select id,userName,birthday,city_id,sex,icon,signature from `user` where telephone = ?',
  addUserIcon:'call addUserIcon(?,?,@res)',
  updateUser:'UPDATE `user` set userName=?,sex=?,birthday=?,city_id=?,signature=? where telephone = ?'
};
