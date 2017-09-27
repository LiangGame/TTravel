import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalPropertyService} from './global-property.service'

@Injectable()
export class IndexService {
  url:string;

  constructor(private http: HttpClient,
              private glo: GlobalPropertyService) {
    this.url = glo.serverUrl;
  }


  show_notes(callback) {
    this.http.post(this.url + '/index/getNotes', '').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  };

  show_scenic(callback) {
    this.http.post(this.url + '/index/getScenic', '').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    );
  }

}

