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
  city: any = [];
  nature: any = [];
  town: any = [];
  history: any = [];
  darkness: any = [];

  constructor(private scenicSer: ScenicService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.getHotScenic();
  }

  ngOnInit() {
  }

  getHotScenic() {
    let that = this;
    that.scenicSer.getHotScenic(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].type == 0) {
            that.city[i] = result[i]
          } else if (result[i].type == 1) {
            that.nature[i]=result[i]
          } else if (result[i].type == 2) {
            that.town[i]=result[i]
          } else if (result[i].type == 3) {
            that.history[i]=result[i]
          } else {
            that.darkness[i]=result[i]
          }
        }
      }
    })
  }

  getScenic(cityname){
    if(cityname){
      this.router.navigate(['/scenic_search'],{queryParams:{'key':cityname}});
    }
  }

}
