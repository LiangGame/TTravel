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
  _like: string;
  key: any;
  @Input() searText: string;


  constructor(private noteSer: NotesService,
              private like: LikeCollectService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.getNotes();
  }



  ngOnInit() {
    // 在ngOnInit（）{}里面写jQ代码
    // 右侧栏滚动到高度> 475位置时，固定不动（'about_fix'是单独在css中设置的固定时的样式）
    $(window).scroll(function () {
      if ($(window).scrollTop() > 475 && $(window).scrollTop() < 1900) {
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

  // ngOnDestroy(){
  //   this.getNotes();
  //   console.log('=============================');
  // }


  // this.route.params.subscribe((params: Params) => {
  //   this.key = (<Params>this.route.queryParams).value['key'];
  //   console.log(this.key);
  //   if (this.key) {
  //     let that = this;
  //     that.getNotes();
  //     that.searText = that.key;
  //   }
  // })


  ngAfterContentChecked() {
    console.log((decodeURI(location.search).split('=')[1]));
    this.route.params.subscribe((params: Params) => {
      this.key = (<Params>this.route.queryParams).value['key'];})
    if(decodeURI(location.search).split('=')[1] == this.key){
      this.searText = this.key;
        // console.log('=============================================');
    }
  }

  getNotes() {
    let that = this;
    let num = {num:5};
    that.noteSer.getNotes(num,function (result) {
      if (result) {
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          result[i].content = (((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/——/ig, ''));
        }
        that.notes = result;
        console.log(that.notes);
      } else {
        console.log('here');
      }
    });
  }

  //加载更多
  loadMore(){
    let that = this;
    let num = {num:5 + that.notes.length};
    that.noteSer.getNotes(num,function (result) {
      console.log(result);
      if (result) {
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          result[i].content = (((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '').replace(/——/ig, ''));
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
    console.log(id);
    let userId = JSON.parse(sessionStorage.getItem('user')).id;
    let notesID = {notesId: id, userId: userId, type: '1'};
    let that = this;
    that.like.getNotesLike(notesID, function (result) {
      if (result.length == 0) {
        that.like.notesLike(notesID, function (result) {
          console.log(result);
          console.log('>>>>>>>travel-notes');
          if (result.stateCode == 'L001') {
            that.getNotes();
            console.log('888888888888');
          }
        })
      }
    })
  }

}

