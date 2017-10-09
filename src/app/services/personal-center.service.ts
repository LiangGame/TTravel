import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LocalStorage} from './local-storage.service';

// declare var $:any;
import {GlobalPropertyService} from './global-property.service';

@Injectable()
export class PersonalCenterService {
  url:string;
  // url:string='http://127.0.0.1:8889/personal-center';
  // url: string = 'http://10.40.4.21:8889/personal-center';

  constructor(private http: HttpClient,
              private ls:LocalStorage,
              private glo: GlobalPropertyService) {
      this.url = glo.serverUrl;
  }

  show_province(callback) {
    this.http.get(this.url + '/personal-center/provinces').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  show_citys(provincename, callback) {
    this.http.post(this.url + '/personal-center/citys', provincename).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getCity(cityId, callback) {
    let params = new HttpParams().set('cityId', cityId);
    this.http.get(this.url + '/personal-center/getCity', {params: params}).subscribe(
      function (result) {
        callback(result);
        // console.log(result);
        // console.log('>>>>>>getCity>>>service');
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  show_notes(userId, callback) {
    let _head = new HttpHeaders({token:this.ls.get('token')});
    this.http.post(this.url + '/personal-center/notes', userId,{headers:_head}).subscribe(
      function (result) {
        // console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  addNotes(body, callback) {
    let _head = new HttpHeaders({token:this.ls.get('token')});
    body.title = body.title.notesTitle;
    this.http.post(this.url + '/personal-center/addNotes', body,{headers:_head}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getUserImages(userId,callback){
    let _head = new HttpHeaders({token:this.ls.get('token')});
    // body.title = body.title.notesTitle;
    this.http.post(this.url + '/personal-center/getUserImages', userId,{headers:_head}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  addFootPorint(body,callback){
    let _head = new HttpHeaders({token:this.ls.get('token')});

    this.http.post(this.url + '/personal-center/addFootPrint', body,{headers:_head}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getAllFootPorint(userId,callback){
    let _head = new HttpHeaders({token:this.ls.get('token')});
    let id = {userId:userId}
    this.http.post(this.url + '/personal-center/getAllFootPrint', id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

}

