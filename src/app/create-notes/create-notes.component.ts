import {Component, OnInit, ViewChild} from '@angular/core';
import {EditorComponent} from './../editor/editor.component'
import * as wangEditor from '../../assets/js/wangEditor.js';
// 导入服务
import {PersonalCenterService} from './../services/personal-center.service';

declare var $:any;

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css'],
  providers: [PersonalCenterService]
})
export class CreateNotesComponent implements OnInit {
  title: string;
  setInfo: string;
  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor(private perSer: PersonalCenterService,) {
  }

  ngOnInit() {

  }

  setNotes(notes) {
    let that = this;
    if (notes.form.value.notesTitle) {
      that.title = notes.form.value;
      that.publishTopic(notes.form.value.notesTitle);
    }
  };

  publishTopic(title) {
    let content = this.editor.clickHandle();
    console.log(content);
    let topicContent = {
      "content": this.editor.clickHandle(),
      "title": this.title,
      "id": JSON.parse(sessionStorage.getItem('user')).id
    };
    // console.log(topicContent);
    if (content == "<p><br></p>") {
      $('#modal').modal({
        backdrop:false
      });
      this.setInfo='请输入内容';
      this.title = title;
      window.setTimeout(function () {
        $('#modal').modal('hide');
      },800);
      return;
    }
    let that = this;
    that.perSer.addNotes(topicContent, function (result) {
      if (result) {
        if (result.stateCode == '001') {
          that.title = '';
          that.editor.clear();
          $('#modal').modal({
            backdrop:false
          });
          that.setInfo='发布成功';
          window.setTimeout(function () {
            $('#modal').modal('hide');
          },800);
        } else if (result.stateCode === '002') {
          that.title = title;
          $('#modal').modal({
            backdrop:false
          });
          that.setInfo='发布失败';
          window.setTimeout(function () {
            $('#modal').modal('hide');
          },800);
        } else {
          that.title = title;
          $('#modal').modal({
            backdrop:false
          });
          alert('发布失败');
          window.setTimeout(function () {
            $('#modal').modal('hide');
          },800);
        }
      }
    })
  };

  PostData(event): void {
    console.log(event + '---->>>postData');
  }
}
