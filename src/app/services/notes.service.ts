import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class NotesService {
  url: string = 'http://10.40.4.21:8889/index';
  constructor(private http: HttpClient,) { }

  getnotesItem(id,callback) {
    this.http.post(this.url+'/notesDetails',id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
