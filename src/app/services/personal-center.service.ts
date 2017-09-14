import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PersonalCenterService {
  url:string='http://localhost:8888/personal-center';
  constructor(
    private http:HttpClient
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
}
