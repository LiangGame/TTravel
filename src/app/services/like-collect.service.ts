import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobalPropertyService} from './global-property.service'
import {LocalStorage} from './local-storage.service';

@Injectable()
export class LikeCollectService {
  url: string;

  constructor(private http: HttpClient,
              private ls: LocalStorage,
              private glo: GlobalPropertyService) {
    this.url = glo.serverUrl;
  }

  // 游记点赞
  notesLike(id, callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/users/notesLike', id, {headers: _head}).subscribe(
      function (result) {
        if (result) {
          callback(result);
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  // 获取游记点赞信息
  getNotesLike(id, callback) {
    // let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/users/getNotesLike', id).subscribe(
      function (result) {
        if (result) {
          callback(result);
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  //游记收藏
  notesCollect(id, callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/users/notesCollect', id, {headers: _head}).subscribe(
      function (result) {
        if (result) {
          callback(result);
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  //获取游记收藏信息
  getNotesCollect(id, callback) {
    // let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/users/getNotesCollect', id).subscribe(
      function (result) {
        if (result) {
          callback(result);
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  };
}
