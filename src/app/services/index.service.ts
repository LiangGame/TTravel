import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalPropertyService} from './global-property.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {log} from "util";

declare var AMap: any;


@Injectable()
export class IndexService {
  url: string;
  cityinfo: any;
  scenics: any;

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
    // 高德地图ip定位
    let that =this;
    var citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function(status, result) {
      if (status === 'complete' && result.info === 'OK') {
        if (result && result.city && result.bounds) {
          that.cityinfo = result.city;  // 当前城市
          var citybounds = result.bounds;
          // 请求数据
          that.http.post(that.url + '/index/getScenic', {city:result.city}).subscribe(
            function (result) {
              that.scenics = result;
              callback(result);
            },
            function (error) {
              console.log(error.message);
            }
          );
          console.log(that.cityinfo);
        }
      } else {
        // document.getElementById('tip').innerHTML = result.info;
      }
    });
  }


  getHeroesSlowly() {
      return new Promise<any>(resolve =>
        setTimeout(() => resolve(this.scenics), 3000) // 2 seconds
      );
  }


}

