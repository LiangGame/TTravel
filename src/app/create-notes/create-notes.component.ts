import {Component, OnInit, ViewChild} from '@angular/core';
import {EditorComponent} from './../editor/editor.component'
import * as wangEditor from '../../assets/js/wangEditor.js';
// 导入服务
import {PersonalCenterService} from './../services/personal-center.service';
import {UserService} from "../services/user.service";

declare var $: any;

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css'],
  providers: [PersonalCenterService, UserService]
})
export class CreateNotesComponent implements OnInit {
  title: string;
  setInfo: string;
  credits: number;


  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor(private perSer: PersonalCenterService,
              private userSer: UserService) {
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
        backdrop: false
      });
      this.setInfo = '请输入内容';
      this.title = title;
      window.setTimeout(function () {
        $('#modal').modal('hide');
      }, 2000);
      return;
    }
    let that = this;
    that.perSer.addNotes(topicContent, function (result) {
      if (result) {
        if (result.stateCode == '001') {
          that.title = '';
          that.editor.clear();
          that.setInfo = '发布成功 时光 +10';
          $('#modal').modal({
            backdrop: false
          });
          that.getCredits(JSON.parse(sessionStorage.getItem('user')).telephone);
          window.setTimeout(function () {
            $('#modal').modal('hide');
          }, 2000);
        } else if (result.stateCode === '002') {
          that.title = title;
          $('#modal').modal({
            backdrop: false
          });
          that.setInfo = '发布失败';
          window.setTimeout(function () {
            $('#modal').modal('hide');
          }, 2000);
        } else {
          that.title = title;
          $('#modal').modal({
            backdrop: false
          });
          alert('发布失败');
          window.setTimeout(function () {
            $('#modal').modal('hide');
          }, 2000);
        }
      }
    })
  };

  PostData(event): void {
    console.log(event + '---->>>postData');
  };

  getCredits(userId) {
    if (userId) {
      let that = this;
      that.userSer.getCredits({telephone: userId}, function (result) {
        console.log(result);
        if (result) {
          if (result != '' || result != null) {
            that.credits = +result[0].userlv;
            console.log('==========获取数据成功---->>>getCredits=========');
            that.userSer.addCredits({telephone: userId, creits: (+that.credits + 10)}, function (result) {
              if (result.affectedRows == 1) {
                // that.router.navigate(['/index']);
                console.log(result);
                console.log('发布游记成功,时光+10');
              }
            });
          }
        }
      });
    }
  }

}
