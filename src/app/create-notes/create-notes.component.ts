import {Component, OnInit, ViewChild} from '@angular/core';
import {EditorComponent} from './../editor/editor.component'
import * as wangEditor from '../../assets/js/wangEditor.js';
// 导入服务
import {PersonalCenterService} from './../services/personal-center.service';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css'],
  providers: [PersonalCenterService]
})
export class CreateNotesComponent implements OnInit {
  title: string;
  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor(private perSer: PersonalCenterService,) {
  }

  ngOnInit() {

  }

  setNotes(notes) {
    let that = this;
    if(notes.form.value.notesTitle){
      that.title = notes.form.value;
      that.publishTopic(notes.form.value.notesTitle);
    }
  };

  publishTopic(title) {
    let content = this.editor.clickHandle();
    console.log(content);
    let topicContent = {"content": this.editor.clickHandle(), "title": this.title,"id":sessionStorage.getItem('user_id')};
    // console.log(topicContent);
    if (content=="<p><br></p>") {
      alert('请输入内容！');
      this.title = title;
      return;
    }
    let that = this;
    that.perSer.addNotes(topicContent, function (result) {
      if (result) {
        if (result.stateCode == '001') {
          that.title='';
          that.editor.clear();
          alert('发布成功');
        } else if(result.stateCode === '002'){
          that.title = title;
          alert('发布失败');
        }else {
          that.title = title;
          alert('发布失败');
        }
      }
    })
  };

  PostData(event): void {
    console.log(event + '---->>>postData');
  }
}
