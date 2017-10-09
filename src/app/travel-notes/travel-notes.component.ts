import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

// 导入服务
import {NotesService} from '../services/notes.service';
import {LikeCollectService} from '../services/like-collect.service'

declare var $: any; // 在angular中调用jQ前的万能语句

@Component({
  selector: 'app-travel-notes',
  templateUrl: './travel-notes.component.html',
  styleUrls: ['./travel-notes.component.css'],
  providers: [NotesService, LikeCollectService]

})

export class TravelNotesComponent implements OnInit {
  notes: any;
  reg: any = /<[^>]+>/g;
  newNotes: any = [];
  _img: any = /<img\s+.*?>/g;
  _like: string;
  key: any;
  hotNotes: any = [];
  @Input() searText: string;


  constructor(private noteSer: NotesService,
              private like: LikeCollectService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.getNotes();
    this.getHotNotes();
  }


  ngOnInit() {
    // 在ngOnInit（）{}里面写jQ代码
    // 右侧栏滚动到高度> 475位置时，固定不动（'about_fix'是单独在css中设置的固定时的样式）
    $(window).scroll(function () {
      // && $(window).scrollTop() < 1900
      if ($(window).scrollTop() > 475) {
        // console.log($(window).scrollTop());
        $('.about').addClass('about_fix');
      } else {
        $('.about').removeClass('about_fix');
      }
    });
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
    // // 加载更多
    //  $('.load').click(function () {
    //    $('.more').show();
    //  }, function () {
    //    $('.more').hide();
    //  });

  };

  ngAfterContentChecked() {
    // console.log((decodeURI(location.search).split('=')[1]));
    this.route.params.subscribe((params: Params) => {
      this.key = (<Params>this.route.queryParams).value['key'];
    })
    if (decodeURI(location.search).split('=')[1] == this.key) {
      this.searText = this.key;
      // console.log('=============================================');
    }
  }

  getNotes() {
    let that = this;
    let num = {num: 5};
    that.noteSer.getNotes(num, function (result) {
      if (result) {
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          if((result[i].content).match(that._img)){
            that.newNotes.push({coverimg:(result[i].content).match(that._img),notes:result[i]})
          }
          result[i].content = (((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/——/ig, ''));
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          }
        }
        // that.notes = result;
        console.log(that.newNotes);
      } else {
        console.log('没获取到游记数据!');
      }
    });
  }

  //加载更多
  loadMore() {
    let that = this;
    let num = {num: 5 + that.notes.length};
    that.noteSer.getNotes(num, function (result) {
      // console.log(result);
      if (result) {
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          result[i].content = (((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/——/ig, ''));
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
        }
        that.notes = result;
        // console.log(that.notes);
      } else {
        // console.log('here');
      }
    });
  }

  noteItem(noteId) {
    if (noteId) {
      this.router.navigate(['/noteschild'], {queryParams: {'key': noteId}});
    }
  }

  // 游记点赞
  setLike(event: Event, id) {
    event.stopImmediatePropagation();     // 防止事件冒泡
    let that = this;
    // console.log(id);
    if (sessionStorage.getItem('user')) {
      let userId = JSON.parse(sessionStorage.getItem('user')).id;
      let notesID = {notesId: id, userId: userId, type: '1'};
      that.like.getNotesLike(notesID, function (result) {
        if (result.length == 0) {
          that.like.notesLike(notesID, function (result) {
            // console.log(result);
            // console.log('>>>>>>>travel-notes');
            if (result.stateCode == 'L001') {
              that.getNotes();
              // console.log('888888888888');
            }
          })
        }
      })
    }else{
      $('#modal').modal({
        backdrop: false
      });
      window.setTimeout(function () {
        $('#modal').modal('hide');
      },2000);
    }
  }

// 相关阅读
  getHotNotes() {
    let that = this;
    that.noteSer.getHotNotes(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if((result[i].content).match(that._img)){
            that.hotNotes.push({coverimg:(result[i].content).match(that._img),notes:result[i]})
          }
          if (result[i].comment == '' || result[i].comment == null) {
            result[i].comment = 0;
          }
          if (result[i].like == '' || result[i].like == null) {
            result[i].like = 0;
          }
        }
        // that.hotNotes = result;
        console.log('相关阅读');
        console.log(that.hotNotes);
      }
    })
  }

}

