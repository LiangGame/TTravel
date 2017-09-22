import {Injectable} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';

@Injectable()
export class ScenicService {
  // url: string = 'http://10.40.4.21:8889/scenic';
  url:string='http://127.0.0.1:8889/scenic';

  constructor(
    private http: HttpClient,
  ) { }

  get_scenic(e,callback) {
    let params = new HttpParams().set('cityName', e);
    console.log(e);
    this.http.get(this.url + '/getScenic', {params: params}).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

}
