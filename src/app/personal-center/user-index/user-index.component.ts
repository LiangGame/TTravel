import { Component, OnInit,ViewChild } from '@angular/core';
import { EditorComponent } from './../../editor/editor.component'

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
        that.newNotes=result[0];
        console.log(that._notes);
        // console.log();
      }else {
        console.log("error")
      }
    })
  };

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
