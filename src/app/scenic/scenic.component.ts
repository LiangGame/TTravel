import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {ScenicService} from "../services/scenic.service";

@Component({
  selector: 'app-scenic',
  templateUrl: './scenic.component.html',
  styleUrls: ['./scenic.component.css'],
  providers: [ScenicService]
})
export class ScenicComponent implements OnInit {
  private num = 0;
  menus: any = ['俯瞰城市', '山水相依', '最爱小镇', '古迹遗址', '魅力夜色'];
  type: any = ['华东地区','华北地区','华南地区','华中地区','东北地区','西北地区','西南地区'];
  typeNum:number = 0;
  city: any = [];
  nature: any = [];
  town: any = [];
  history: any = [];
  darkness: any = [];
  east: any = [];   // 东
  south: any = [];  // 南
  west: any = [];  // 中
  north: any = [];// 北
  south_west: any = [];// 西南
  north_west: any = [];// 西北
  north_east: any = [];// 东北

  constructor(private scenicSer: ScenicService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.getHotScenic();
    this.getcity();
  }

  ngOnInit() {
    window.scrollTo(0,0);
  }

  getHotScenic() {
    let that = this;
    that.scenicSer.getHotScenic(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].type == 0) {
            that.city[i] = result[i]
          } else if (result[i].type == 1) {
            that.nature[i] = result[i]
          } else if (result[i].type == 2) {
            that.town[i] = result[i]
          } else if (result[i].type == 3) {
            that.history[i] = result[i]
          } else {
            that.darkness[i] = result[i]
          }
        }
      }
    })
  }

  getScenic(cityname) {
    console.log(cityname);
    if (cityname) {
      this.router.navigate(['/scenic_search'], {queryParams: {'key': cityname}});
    }
  }

  getcity() {
    let that = this;
    that.scenicSer.getCitys(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].type.indexOf('华东地区') != -1) {
            that.east.push(result[i]);
          } else if (result[i].type.indexOf('华南地区') != -1) {
            that.south.push(result[i]);
          } else if (result[i].type.indexOf('华中地区') != -1) {
            that.west.push(result[i]);
          } else if (result[i].type.indexOf('华北地区') != -1) {
            that.north.push(result[i]);
          } else if (result[i].type.indexOf('西南地区') != -1) {
            that.south_west.push(result[i]);
          } else if (result[i].type.indexOf('西北地区') != -1) {
            that.north_west.push(result[i]);
          } else {
            that.north_east.push(result[i]);
          }
        }
        console.log('华东地区');
        console.log(that.east);
        console.log('华南地区');
        console.log(that.south);
        console.log('华中地区');
        console.log(that.west);
        console.log('华北地区');
        console.log(that.north);
        console.log('西南地区');
        console.log(that.south_west);
        console.log('西北地区');
        console.log(that.north_west);
        console.log('东北地区');
        console.log(that.north_east);
      }
    })
  }

}
