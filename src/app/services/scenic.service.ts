import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalPropertyService} from './global-property.service'

@Injectable()
export class ScenicService {
  url: string;
  // url: string = 'http://10.40.4.21:8889/scenic';
  // url: string = 'http://127.0.0.1:8889/scenic';
  public scenicInfo: any;

  constructor(private http: HttpClient,
              private glo: GlobalPropertyService) {
    this.url = glo.serverUrl;
  }

  get_scenic(callback) {
    let that = this;
    // let params = new HttpParams().set('cityName', e);
    this.http.get(that.url + '/scenic/getScenic').subscribe(
      function (result) {
        that.scenicInfo = result;
        // console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }

  getScenicItem(id, callback) {
    // console.log(id)1;
    let that = this;
    // let params = new HttpParams().set('cityName', e);
    this.http.post(that.url + '/scenic/getScenicItem', id).subscribe(
      function (result) {
        that.scenicInfo = result;
        // console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
