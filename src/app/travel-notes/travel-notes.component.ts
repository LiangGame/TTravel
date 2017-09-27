import {Component, OnInit} from '@angular/core';
import {NotesService} from '../services/notes.service';
import {ActivatedRoute, Router, Params} from '@angular/router';

declare var $: any; // 在angular中调用jQ前的万能语句

@Component({
  selector: 'app-travel-notes',
  templateUrl: './travel-notes.component.html',
  styleUrls: ['./travel-notes.component.css'],
  providers: [NotesService]

})

export class TravelNotesComponent implements OnInit {
  notes: any;
  reg: any = /<[^>]+>/g;


  constructor(private noteSer: NotesService,
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

  }

  getNotes() {
    let that = this;
    that.noteSer.getNotes(function (result) {
      if (result) {
        let reg = that.reg;
        for (let i = 0; i < result.length; i++) {
          result[i].content = ((result[i].content).replace(reg, '')).replace(/&nbsp;/ig, '');
          // console.log(((that.notes[0].content).replace(reg)));
        }
        that.notes = result;
      } else {
        console.log('here');
      }
    });
  }

  noteItem(noteId) {
    if (noteId) {
      this.router.navigate(['/noteschild'], {queryParams: {'key': noteId}});
    }
  }

}

