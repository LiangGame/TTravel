import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// declare var $:any;
import {GlobalPropertyService} from './global-property.service';

@Injectable()
export class PersonalCenterService {

  // url:string='http://127.0.0.1:8889/personal-center';
  url:string='http://10.40.4.21:8889/personal-center';
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
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  addNotes(body,callback){
    this.http.post(this.url+'/addNotes',body).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
