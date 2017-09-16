import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  url:string='http://127.0.0.1:8889/users';
  // url:string='http://10.40.4.21:8889/personal-center';

  constructor(
    private http:HttpClient,
  ) { }

  addUser(user,callback) {
    this.http.post(this.url+'/register',user).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getByPwd(user,callback){
    this.http.post(this.url+'/login',user).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
