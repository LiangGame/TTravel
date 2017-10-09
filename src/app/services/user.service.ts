import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {GlobalPropertyService} from './global-property.service';
import {LocalStorage} from './local-storage.service';
// import {headersToString} from "selenium-webdriver/http";
@Injectable()
export class UserService {
  url: string;
  // url:string='http://127.0.0.1:8889/users';
  // url:string='http://10.40.4.21:8889/users';

  constructor(private http: HttpClient,
              private glo: GlobalPropertyService,
              private ls:LocalStorage) {
    this.url = glo.serverUrl
    console.log(this.url);
  }
  // 添加用户
  addUser(user, callback) {
    let _head = new HttpHeaders({token:this.ls.get('token')});
    this.http.post(this.url + '/users/register', user,{headers:_head}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 登录
  getByPwd(user, callback) {
    this.http.post(this.url + '/users/login', user).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

// 获取用户头像
  getUserIcon(telephone, callback) {
    let _head = new HttpHeaders({token:this.ls.get('token')});
    this.http.post(this.url + '/users/getUserIcon', telephone,{headers:_head}).subscribe(
      function (result) {
        callback(result)
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 获取用户信息
  getUser(telephone,callback){
    let _head = new HttpHeaders({token:this.ls.get('token')});
    this.http.post(this.url + '/users/getUser', {telephone:telephone},{headers:_head}).subscribe(
      function (result) {
        callback(result)
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
// 修改个人信息
  updateUser(user, callback) {
    let _head = new HttpHeaders({token:this.ls.get('token')});
    console.log(user + '---->>>user.service!!');
    this.http.post(this.url + '/users/updateUser', user,{headers:_head}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 获取用户积分
  getCredits(userId,callback){
    let _head = new HttpHeaders({token:this.ls.get('token')});
    this.http.post(this.url + '/users/getCredits', userId,{headers:_head}).subscribe(
      function (result) {
        callback(result)
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 增加积分
  addCredits(info,callback){
    console.log(info);
    let _head = new HttpHeaders({token:this.ls.get('token')});
    this.http.post(this.url + '/users/addCredits', info,{headers:_head}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 验证码
  sendCode(tel,callback){
    let telephone = new HttpParams().set('telephone', tel);
    this.http.get(this.url + '/users/verify', {params:telephone} ).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
