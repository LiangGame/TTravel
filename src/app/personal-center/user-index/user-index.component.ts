import {Component, OnInit, ViewChild} from '@angular/core';
import {EditorComponent} from './../../editor/editor.component'

// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';
import {GlobalPropertyService} from './../../services/global-property.service';
import {AuthGuard} from "../../services/auth-guard.service";

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css'],
  providers: [PersonalCenterService,AuthGuard]
})
export class UserIndexComponent implements OnInit {
  url: any;
  images: any = [];
  user: any = JSON.parse(sessionStorage.getItem('user'));
  _notes: any;
  newNotes: string;
  reg: any = /<[^>]+>/g;
  userId: any;
  noNotes: any = false;
  userIcon: any = JSON.parse(sessionStorage.getItem('user')).icon;
  @ViewChild(EditorComponent)
  editor: EditorComponent;

  constructor(private perSer: PersonalCenterService,
              private glo: GlobalPropertyService,) {
    this.userId = JSON.parse(sessionStorage.getItem('user')).telephone;
  }

  ngOnInit() {
    this.url = this.glo.serverUrl;
    this.getNotes();
    this.getuserImg();
  }

  getNotes() {
    let that = this;
    that.userId = {userId: that.userId};
    that.perSer.show_notes(that.userId, function (result) {
      if (result && result != '') {
        that.noNotes = true;
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/\——/ig, '');
          if(result[i].like == ''||result[i].like == null){
            result[i].like=0;
          }
          if(result[i].comment == ''||result[i].comment == null){
            result[i].comment=0;
          }
          // console.log(((that.notes[0].content).replace(reg)));
        }
        that._notes = result;
        that.newNotes = result[0];
        // console.log(that._notes);
        // console.log(result);
      } else {
        that.noNotes = false;
        // console.log("error")
      }
    })
  };

  getuserImg() {
    let that = this;
    that.userId = {userId: that.user.id};
    that.perSer.getUserImages(that.userId, function (result) {
      if (result) {
        if(result.length <= 4){
          for (let i = 0; i < result.length; i++) {
            // console.log(result[0].url);
            that.images[i] = result[i].url;
            // that.images[i] = `<img src="${that.glo.serverUrl}/userImgs/${result[i].url}" alt="" class="pull-left" style="margin: 15px" width="190" height="180">`;
          }
        }else{
          for (let i = 0; i < 4; i++) {
            // console.log(result[0].url);
            that.images[i] = result[i].url;
            // that.images[i] = `<img src="${that.glo.serverUrl}/userImgs/${result[i].url}" alt="" class="pull-left" style="margin: 15px" width="190" height="180">`;
          }
        }
        // that.images = result;
        // console.log(that.images);
      }
    })
  }
}
