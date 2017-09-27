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

  getNotes(callback) {
    this.http.post(this.url + '/index/getNotes', '').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

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
}
