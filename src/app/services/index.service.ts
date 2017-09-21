import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class IndexService {

// url:string='http://127.0.0.1:8889/personal-center';
  url: string = 'http://10.40.4.21:8889/personal-center';

  constructor(private http: HttpClient,) {
  }


  show_notes(callback) {
    this.http.post(this.url + '/notes', '').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

}

