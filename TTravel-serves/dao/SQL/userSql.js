/**
 * Created by WWL on 2017/9/11.
 */
exports.sql={
  getPasswordById:'select userPassword from user where telephone=?',
  addUser:'insert into user(telephone,username,userPassword,city_id,userlv_id)values(?,?,?,?,?)',
  createToken:'update user set token=? where telephone=?',
  getUserIcon:'select user_icon.icon from user inner join user_icon ON user.id=user_icon.user_id where user.telephone=? order by upload_date desc ',
  addUserIcon:'call addUserIcon(?,?,@res)'
};
