import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GlobalPropertyService} from './global-property.service';

@Injectable()
export class PersonalCenterService {
  url:string='http://localhost:8889/personal-center';
  constructor(
    private http:HttpClient,
    private glo:GlobalPropertyService
  ) { }

  show_province(callback){
    this.http.get(this.url+'/provinces').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  show_citys(provincename,callback){
    this.http.post(this.url+'/citys',provincename).subscribe(
    function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  show_notes(callback) {
    this.http.post(this.url+'/notes','').subscribe(
      function (result) {
        // console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
