import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {NotesService} from './../services/notes.service';
import {LikeCollectService} from '../services/like-collect.service';
import {GlobalPropertyService} from './../services/global-property.service'

declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-notes-child',
  templateUrl: './notes-child.component.html',
  styleUrls: ['./notes-child.component.css'],
  providers: [NotesService, LikeCollectService, GlobalPropertyService],
})
export class NotesChildComponent implements OnInit {
  notes: any;
  iconUrl: any;
  userIcon: any;
  notesId: any;
  comments: any;
  commentText: string = '';
  noLogin: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notesSer: NotesService,
              private like: LikeCollectService,
              private glo: GlobalPropertyService) {
    this.get_note();
    if (sessionStorage.getItem('user')) {
      this.iconUrl = JSON.parse(sessionStorage.getItem('user')).icon;
      this.noLogin = true;
      this.getNotesComment(this.notesId);
    }
    this.userIcon = `<img src="${this.glo.serverUrl}/uploads/${this.iconUrl}" alt="" width="60" height="60">`;
  }

  ngOnInit() {
    /*返回顶部*/
    $(window).scroll(function () {
      let height = $(window).scrollTop();
      // console.log(height);
      if (height > 475) {
        $('#to_top').show();
      } else if (height <= 475) {
        $('#to_top').hide();
      }
    });
    $('#to_top').click(function () {
      let height = $(window).scrollTop();
      let inter = setInterval(function () {
        if (height > 0) {
          height -= 20;
        } else {
          clearInterval(inter);
        }
        $(window).scrollTop(height);
      }, 10);
    });
  }

  get_note() {
    this.route.params.subscribe((params: Params) => {
      let id = (<Params>this.route.queryParams).value['key'];
      this.notesId = {notesId: id}
      if (id) {
        let that = this;
        id = {"id": id};
        that.notesSer.getnotesItem(id, function (result) {
          // console.log(id);
          // console.log('>>>>>>>>>');
          if (result) {
            that.notes = result[0];
            console.log(that.notes);
            // that.images = result[0].url.split(',');
          }
        })
      }
    });
  }

  // 游记收藏
  setCollect(event: Event, id) {
    event.stopImmediatePropagation();     // 防止事件冒泡
    console.log(id);
    let userId = JSON.parse(sessionStorage.getItem('user')).id;
    let notesID = {notesId: id, userId: userId, type: '1'};
    console.log(notesID);
    let that = this;
    that.like.getNotesCollect(notesID, function (result) {
      console.log(result);
      if (result.length == 0) {
        that.like.notesCollect(notesID, function (result) {
          console.log(result);
          console.log('>>>>>>>travel-notes');
          if (result.stateCode == 'L001') { // 点赞成功
            // console.log('123');
            that.get_note();
          }
        })
      }
    })
  }

  // 游记评论

  notesComment(commentForm, notesId) {
    // console.log(commentForm);
    let userId = JSON.parse(sessionStorage.getItem('user')).id;
    let body = {comment: commentForm.value.comment, notesId: notesId, userId: userId, type: 1}
    let that = this;
    that.notesSer.notesComment(body, function (result) {
      console.log(result);
      if (result) {
        that.getNotesComment(that.notesId);
        that.commentText = '';
      }
    })
  }

  getNotesComment(notesId) {
    // console.log(notesId);
    // console.log('123123123123');
    let that = this;
    that.notesSer.getnotesComment(notesId, function (result) {
      console.log(result);
      if (result) {
        that.comments = result;
        // console.log(result);
        // console.log('=====================================');
      }
    })
  }

}
