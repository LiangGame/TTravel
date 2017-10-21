import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {NotesService} from './../services/notes.service';
import {LikeCollectService} from '../services/like-collect.service';
import {GlobalPropertyService} from './../services/global-property.service'
import {UserService} from "../services/user.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ISO_8601} from "../../../TTravel-serves/node_modules/moment/moment";

declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-notes-child',
  templateUrl: './notes-child.component.html',
  styleUrls: ['./notes-child.component.css'],
  providers: [NotesService,
    LikeCollectService,
    GlobalPropertyService,
    UserService],
})
export class NotesChildComponent implements OnInit {
  notes: any;
  iconUrl: any;
  userIcon: any;
  notesId: any;
  comments: any;
  commentText: string = '';
  noLogin: boolean = false;
  commentInfo: string;
  credits: number;
  topInfoError: any;
  url: any;
  qnUrl: any;
  notesUrl: string;

  _title:any;_source:any;_sourceUrl:any;_showcount:any;_desc:any;
  _summary:any = '@-时光游-';
  _site:any;
  _width:any = 600;
  _height = 600;
  _top = (screen.height-this._height)/2;
  _left = (screen.width-this._width)/2;
  _url:any;
  notesImg: any;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private notesSer: NotesService,
              private like: LikeCollectService,
              private glo: GlobalPropertyService,
              private userSer: UserService) {
    this.get_note();
    if (sessionStorage.getItem('user')) {
      this.iconUrl = JSON.parse(sessionStorage.getItem('user')).icon;
      this.noLogin = true;
      // console.log('====================================');
      // console.log(this.notesId);
      this.getNotesComment(this.notesId);
    }
    this.userIcon = `<img src="${this.glo.serverUrl}/uploads/${this.iconUrl}" alt="" width="60" height="60">`;
  }

  ngOnInit() {

    this.url = this.glo.serverUrl;
    this.qnUrl = this.glo.qiniuUrl;
    window.scrollTo(0, 0);
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
          if (result) {
            result[0].content = (result[0].content).replace(/&nbsp;/ig, '');


            if ((result[0].content).match(/<img\s+.*?>/g)) {
              that.notesImg = [];
              for (let i of ((result[0].content).match(/<img\s+.*?>/g))) {
                that.notesImg.push(i.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]);
              }
            }
            // console.log(that.notesImg);
            that.notes = result[0];
            // console.log(that.notes);
          }
        })
      }
    });
  }

  // 游记收藏
  setCollect(event: Event, id) {
    event.stopImmediatePropagation();     // 防止事件冒泡
    // console.log(id);
    let userId = JSON.parse(sessionStorage.getItem('user')).id;
    let notesID = {notesId: id, userId: userId, type: '1'};
    // console.log(notesID);
    let that = this;
    that.like.getNotesCollect(notesID, function (result) {
      // console.log(result);
      if (result.length == 0) {
        that.like.notesCollect(notesID, function (result) {
          // console.log(result);
          // console.log('>>>>>>>travel-notes');
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
      // console.log(result);
      if (result) {
        $('#modal').modal({
          backdrop: false
        });
        that.commentInfo = '评论成功! 时光 +5';
        that.getNotesComment(that.notesId);
        that.commentText = '';
        that.getCredits(JSON.parse(sessionStorage.getItem('user')).telephone);
        window.setTimeout(function () {
          $('#modal').modal('hide');
        }, 2000);
      }
    })
  }

  // 获取评论信息
  getNotesComment(notesId) {
    let that = this;
    that.notesSer.getnotesComment(notesId, function (result) {
      if (result) {
        that.comments = result;
        // console.log('===================获取评论数据==================');
        // console.log(result);
        // console.log('================================================');
      }
    })
  }

  // 删除评论
  isdelete() {
    // $('#deleteModal').modal('show');
    $('#deleteModal').modal({backdrop: false});
  }

  delete(Id) {
    // console.log(Id);
    let commentId = {commentId: Id};
    let that = this;
    that.notesSer.deleteComment(commentId, function (result) {
      // console.log(result);
      if (result) {
        if (result == 1) {
          $('#deleteModal').modal('hide');
          that.getNotesComment(that.notesId);
        } else {
          // console.log('=====================================');
        }
      }
    })
  }

  getCredits(userId) {
    if (userId) {
      let that = this;
      that.userSer.getCredits({telephone: userId}, function (result) {
        // console.log(result);
        if (result) {
          if (result != '' || result != null) {
            that.credits = +result[0].userlv;
            // console.log('==========获取数据成功---->>>getCredits=========');
            that.userSer.addCredits({telephone: userId, creits: (+that.credits + 5)}, function (result) {
              if (result.affectedRows == 1) {
                // that.router.navigate(['/index']);
                // console.log(result);
                // console.log('评论成功,时光+5');
              }
            });
          }
        }
      });
    }
  }

  editTopInfo() {
    $('#topInfo').modal({backdrop: false});
  }

  topInfo(notesId, topInfoForm) {
    // console.log(topInfoForm.value);
    // console.log(notesId);
    let that = this;
    let body = {notesId: notesId, topInfo: topInfoForm.value};
    if (notesId && topInfoForm.value) {
      that.notesSer.updateTopInfo(body, function (result) {
        if (result) {
          if (result.stateCode == '001') {
            this.get_note();
            $('#topInfo').modal('hide');
            // console.log('游记头部信息修改成功');
          } else {
            that.topInfoError = '修改失败!';
            // console.log('游记头部信息修改失败');
          }
        }
      })
    }
  }

  // collect() {
  //   this.geturl();
  // }
  //
  // geturl() {
  //   this.notesUrl = encodeURIComponent(location.href);
  // }

  /*  shareToXl(title){
      var sharesinastring='http://v.t.sina.com.cn/share/share.php?appkey=1988870613&title='+'%23一直在路上%23'+
        '我发现了一篇【+'+title+'+】。'+
        '&url='+encodeURIComponent(location.href)+
        '&content=utf-8&sourceUrl='+encodeURIComponent(location.href)+'&pic='+encodeURIComponent(this.notesImg[0])+
        '&ralateUid=5485378676&';
      window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
    }*/
  shareToXl(title,event) {
    event.preventDefault();
    var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=1988870613';     //真实的appkey，必选参数
    _shareUrl += '&url=' + encodeURIComponent(this._url || location.href);     //参数url设置分享的内容链接|默认当前页location，可选参数
    _shareUrl += '&title=' + encodeURIComponent('%23一直在路上%23 我发现了一篇【'+title+'】。');    //参数title设置分享的标题|默认当前页标题，可选参数
    _shareUrl += '&source=' + encodeURIComponent(this._source || '');
    _shareUrl += '&sourceUrl=' + encodeURIComponent(this._sourceUrl || location.href);
    _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
    _shareUrl += '&pic=' + encodeURIComponent(this.notesImg || '');  //参数pic设置图片链接|默认为空，可选参数
    _shareUrl += '&ralateUid=5485378676&';
    window.open(_shareUrl, '_blank', 'width=' + this._width + ',height=' + this._height + ',top=' + this._top + ',left=' + this._left + ',toolbar=no,menubar=no,scrollbars=no, resizable=1,location=no,status=0');
  }

 shareToQzone(title,event){
         event.preventDefault();

         var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
         _shareUrl += 'url=' + encodeURIComponent(this._url||location.href);   //参数url设置分享的内容链接|默认当前页location
         _shareUrl += '&showcount=' + this._showcount||0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
         _shareUrl += '&desc=' + encodeURIComponent('#一直在路上# 我发现了一篇【'+title+'】。'||'分享的描述');    //参数desc设置分享的描述，可选参数
         _shareUrl += '&summary=' + encodeURIComponent(this._summary||'分享摘要');    //参数summary设置分享摘要，可选参数
         _shareUrl += '&title=' + encodeURIComponent(title);    //参数title设置分享标题，可选参数
         _shareUrl += '&site=' + encodeURIComponent(this._site||location.href);   //参数site设置分享来源，可选参数
         _shareUrl += '&pics=' + encodeURIComponent(this.notesImg||'');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
         window.open(_shareUrl,'_blank','width='+this._width+',height='+this._height+',top='+this._top+',left='+this._left+',toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0');
     }
}
