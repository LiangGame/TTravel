import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorage} from './local-storage.service';
import {GlobalPropertyService} from './global-property.service';

@Injectable()
export class StrategyService {
  url: string;
  // url: string = 'http://10.40.4.21:8889';

  constructor(private http: HttpClient,
              private ls: LocalStorage,
              private glo: GlobalPropertyService,) {
    this.url = glo.serverUrl;
  }

  //获取全部攻略
  getStrategy(callback) {
    this.http.post(this.url + '/strategy/getStrategy', '').subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
  //获取指定攻略
  getStrategyItem(id, callback) {
    this.http.post(this.url + '/strategy/strategyDetails', id).subscribe(
      function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      }
    )
  }
}
