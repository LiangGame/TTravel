/**
 * Created by WWL on 2017/9/11.
 */
exports.sql={
  getPasswordById:'select id,telephone,userName,userPassword,birthday,city_id,sex,icon,signature from user where telephone=?',
  addUser:'insert into user(telephone,userName,userPassword,city_id,userlv)values(?,?,?,?,?)',
  createToken:'update user set token=? where telephone=?',
  getUser:'select * from `users` where telephone = ?',
  addUserIcon:'UPDATE `user` set icon=? where telephone=?',
  adduserImg:'INSERT INTO userimage(url,time,user_id)VALUES(?,NOW(),?)',
  updateUser:'UPDATE `user` set userName=?,sex=?,birthday=?,city_id=?,signature=? where telephone = ?',
  setLike:'INSERT INTO `like`(clickid,time,user_id,click_type_id) VALUES(?,NOW(),?,?)',
  getNotesLike:'SELECT 1 FROM `like` WHERE clickid=? and user_id=? and click_type_id=? LIMIT 1',
  setCollect:'INSERT INTO `collect`(collect_id,user_id,click_type_id) VALUES(?,?,?)',
  getNotesCollect:'SELECT 1 FROM `collect` WHERE collect_id=? and user_id=? and click_type_id=? LIMIT 1',
  setComment:'INSERT INTO `comment`(content,time,comment_id,user_id,click_type_id)VALUES(?,NOW(),?,?,?)',
  getNotesComment:'SELECT *,(SELECT COUNT(comment_id) FROM comments WHERE comment_id = ? GROUP BY comment_id) commentNum FROM comments where comment_id = ?',
  deleteNotesComment:'DELETE FROM `comment` WHERE id = ?',
  getCredits:'SELECT userlv from users where telephone = ?',
  addCredits:'UPDATE `user` SET userlv = ? WHERE telephone = ?',
  updateTopInfo:'UPDATE user_travelnotes SET starTime = ?,useTime = ?,cost=?,person = ? WHERE id = ?',
};
