import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../config';
import {URLS} from '../url.Data';
@Injectable()
export class UserService {
<<<<<<< HEAD
  // url:string='http://127.0.0.1:8889/users';
  url:string='http://10.40.4.21:8889/users';
=======
  getUrl(): URL[] {
    this.url = Promise.resolve(URLS).__zone_symbol__value[0].url;
  }

  url;
  // url:string='http://127.0.0.1:8889/users';
  // url:string='http://10.40.4.21:8889/users';
>>>>>>> c5d6f623d51e2df08461bb3f0a484265385e4378

  constructor(private http: HttpClient,) {
    this.getUrl();
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


  getUser(telephone, callback) {
    this.http.post(this.url + '/users/getUser', telephone).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }


  addUserIcon(IconFile, callback) {
    console.log(IconFile);
    this.http.post(this.url + '/users/upload', IconFile).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  updateUser(user, callback) {
    console.log(user + '---->>>user.service!!');
    this.http.post(this.url + '/users/updateUser', user).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
