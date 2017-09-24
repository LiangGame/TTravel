import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class NotesService {
  url: string = 'http://127.0.0.1:8889';
  // url: string = 'http://10.40.4.21:8889';

  constructor(private http: HttpClient) {
  }

  getNotes(callback){
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
}
