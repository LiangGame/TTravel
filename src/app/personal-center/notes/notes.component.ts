import {Component, OnInit, ViewChild} from '@angular/core';
// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';


import {EditorComponent} from './../../editor/editor.component'
import {AuthGuard} from "../../services/auth-guard.service";
import {GlobalPropertyService} from "../../services/global-property.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [PersonalCenterService, AuthGuard, GlobalPropertyService],
})
export class NotesComponent implements OnInit {
  url: string;
  _check: any = [];
  ischeck: any = [];
  nocheck: any = [];
  reg: any = /<[^>]+>/g;
  newNotes: any = [];
  _img: any = /<img\s+.*?>/g;
  len: number = 0;
  user: any = JSON.parse(sessionStorage.getItem('user'));
  userId: any;
  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor(private perSer: PersonalCenterService,
              private glo: GlobalPropertyService) {
    this.userId = {"userId": this.user.telephone}
  }

  ngOnInit() {
    this.url = this.glo.serverUrl;
    this.getNotes(this.userId);
  }

  ngAfterViewInit() {

  }

  getNotes(userId) {
    let that = this;
    that.perSer.show_notes(userId, function (result) {
      if (result) {
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          // console.log((result[i].content).match(that._img));
          if ((result[i].content).match(that._img)) {
            that.newNotes.push({coverimg: (result[i].content).match(that._img), notes: result[i]})
          } else {
            that.newNotes.push({coverimg: [`<img src="${that.url}/uploads/notesDefault.jpeg">`], notes: result[i]})
          }
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/\——/ig, '');
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          }
          ;
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
          // console.log(i);
          // console.log(that.newNotes);

          if (that.newNotes[i].notes.check == '0') {
            that._check.push(that.newNotes[i]);
          } else if (that.newNotes[i].notes.check == '1') {
            that.ischeck.push(that.newNotes[i]);
          } else {
            that.nocheck.push(that.newNotes[i]);
          }

        }
      } else {
        // console.log("error")
      }
    })

  }

}
