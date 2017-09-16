import { Component, OnInit,ViewChild } from '@angular/core';

// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';


import { EditorComponent } from './../../editor/editor.component'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [PersonalCenterService]
})
export class NotesComponent implements OnInit {
 _notes:any;

  @ViewChild(EditorComponent) editor: EditorComponent;
  constructor(
    private perSer: PersonalCenterService,
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(){
    let that = this;
    that.perSer.show_notes(function (result) {
      if(result){
        that._notes=result;
        console.log(that._notes);
        // console.log();
      }else {
        console.log("error")
      }
    })
  }

  publishTopic() {
    let topicContent = this.editor.clickHandle();

    if(!topicContent){
      alert('请输入内容！');
      return;
    }
    console.log(topicContent);
    let that = this;
    that.perSer.addNotes(topicContent,function(result){
      console.log(result);
    })
  };

  PostData(event):void {
    console.log(event+'---->>>postData');
  }
}
