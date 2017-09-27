import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
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

  addUser(user, callback) {
    this.http.post(this.url + '/users/register', user).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

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
}
