/**
 * Created by WWL on 2017/9/18.
 */


// https://cnodejs.org/topic/53c652bfc9507b404446ee40

// http://momentjs.com/docs/#/get-set/
var jwt=require('jwt-simple');
var moment = require('moment');

// 生成token
// var expires = moment().add(7, 'days').valueOf();
// var token = jwt.encode({
//     iss: '13812790421',
//     exp: expires
// }, 'com.jobapp');

// console.log(token);

var token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMzU2OTA0MDAxNSIsImV4cCI6MTUwNjg2NjgzNjY2Mn0.MhJNZxDHhfGhWRi4Oh-gmPTi7MpltC8UcCYb9LxyPmc'
//解析token
var decoded = jwt.decode(token,'com.TTravel');

console.log(decoded);
console.log("<<<<<<<<<<<<<");

//服务器端获取token

// var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
//
//
// if (token) {
//     try {
//         var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
//
//         // handle token here
//
//     } catch (err) {
//         return next();
//     }
// } else {
//     next();
// }
