import {Component, OnInit, ViewChild} from '@angular/core';
import {EditorComponent} from './../../editor/editor.component'

// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css'],
  providers: [PersonalCenterService]
})
export class UserIndexComponent implements OnInit {
  _notes: any;
  newNotes: string;
  reg: any = /<[^>]+>/g;
  userId: any = {"userId":sessionStorage.getItem('userId')};
    @ViewChild(EditorComponent)
  editor: EditorComponent;

  constructor(private perSer: PersonalCenterService,) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    let that = this;
    that.perSer.show_notes(that.userId, function (result) {
      if (result) {
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '');
          // console.log(((that.notes[0].content).replace(reg)));
        }
        that._notes = result;
        that.newNotes = result[0];
        console.log(that._notes);
        // console.log();
      } else {
        console.log("error")
      }
    })
  };


}
