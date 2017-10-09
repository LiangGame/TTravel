import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorage} from './local-storage.service';
import {GlobalPropertyService} from './global-property.service';


@Injectable()
export class NotesService {
  url: string;
  // url: string = 'http://10.40.4.21:8889';

  constructor(private http: HttpClient,
              private ls: LocalStorage,
              private glo: GlobalPropertyService,) {
    this.url = glo.serverUrl;
  }

  //获取全部游记
  getNotes(num,callback) {
    this.http.post(this.url + '/index/getNotes', num).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //获取指定游记
  getnotesItem(id, callback) {
    this.http.post(this.url + '/index/notesDetails', id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 游记评论
  notesComment(body,callback){
    console.log(body);
    this.http.post(this.url + '/users/notesComment', body).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 获取游记评论信息
  getnotesComment(id,callback){
    this.http.post(this.url + '/users/getNotesComment', id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 删除游记评论
  deleteComment(id,callback){
    this.http.post(this.url + '/users/deleteComment', id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 获取点赞最多的游记
  getHotNotes(callback){
    this.http.post(this.url + '/index/getHotNotes', '').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  // 修改头部信息
  updateTopInfo(body,callback){
    this.http.post(this.url + '/users/updateTopInfo', body).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
