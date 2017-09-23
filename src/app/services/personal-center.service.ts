import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {URL} from '../config';
// import {URLS} from '../url.Data';
// declare var $:any;
import {GlobalPropertyService} from './global-property.service';

@Injectable()
export class PersonalCenterService {
  // getUrl(): URL[] {
  //   this.url = Promise.resolve(URLS).__zone_symbol__value[0].url;
  // }
  //
  // url;
  // url:string='http://127.0.0.1:8889/personal-center';
  url: string = 'http://10.40.4.21:8889';

  constructor(private http: HttpClient,
              private glo: GlobalPropertyService) {
    // this.getUrl();
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
    this.http.post(this.url + '/personal-center/notes', userId).subscribe(
      function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  addNotes(body, callback) {
    body.title = body.title.notesTitle
    this.http.post(this.url + '/personal-center/addNotes', body).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  // uploadIcon(files, callback) {
  //   let headers = new Headers({
  //     "Accept": "application/json"
  //   });
  //   let options = new RequestOptions({headers});
  //   this.http.post(this.url+'/upload', files, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(data => console.log('success' + data),
  //     error => console.log(error))
  // }
}

