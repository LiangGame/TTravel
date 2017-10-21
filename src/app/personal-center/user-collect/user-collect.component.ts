import { Component, OnInit } from '@angular/core';
import {PersonalCenterService} from './../../services/personal-center.service';


import {AuthGuard} from "../../services/auth-guard.service";

@Component({
  selector: 'app-user-collect',
  templateUrl: './user-collect.component.html',
  styleUrls: ['./user-collect.component.css'],
  providers: [PersonalCenterService,AuthGuard]

})
export class UserCollectComponent implements OnInit {
  reg: any = /<[^>]+>/g;
  newNotes: any = [];
  _img: any = /<img\s+.*?>/g;
  user: any = JSON.parse(sessionStorage.getItem('user'));
  userId:any;

  constructor(
    private perSer:PersonalCenterService
  ) {
    this.userId = {"userId": this.user.id}
  }

  ngOnInit() {
    this.getUserCollect(this.userId);
  }

  getUserCollect(userId) {
    let that = this;
    that.perSer.getUserCollect(userId, function (result) {
      if (result) {
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          // console.log((result[i].content).match(that._img));
          if((result[i].content).match(that._img)){
            that.newNotes.push({coverimg:(result[i].content).match(that._img),notes:result[i]})
          }
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/\——/ig, '');
          if(result[i].like==''||result[i].like==null){
            result[i].like=0;
          };
          if(result[i].comment==''||result[i].comment==null){
            result[i].comment=0;
          }
        }
        // console.log(that.newNotes);
      } else {
        // console.log("error")
      }
    })
  }

}
