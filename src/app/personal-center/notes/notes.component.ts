import {Component, OnInit, ViewChild} from '@angular/core';
// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';


import {EditorComponent} from './../../editor/editor.component'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [PersonalCenterService],
})
export class NotesComponent implements OnInit {
  _notes: any = [];
  reg: any = /<[^>]+>/g;
  newNotes: any = [];
  // _img: any = /<img\s+.*?>/;
  len: number = 0;
  user: any = JSON.parse(sessionStorage.getItem('user'));
  userId: any;
  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor(private perSer: PersonalCenterService,) {
    this.userId = {"userId": this.user.telephone}
  }

  ngOnInit() {
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
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '');
          // console.log(((that.notes[0].content).replace(reg)));
        }
        that._notes = result;
        console.log(result);
      } else {
        console.log("error")
      }
    })
  }

}
