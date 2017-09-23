import {Component, OnInit} from '@angular/core';

declare var $: any; // 在angular中调用jQ前的万能语句

@Component({
  selector: 'app-travel-notes',
  templateUrl: './travel-notes.component.html',
  styleUrls: ['./travel-notes.component.css']
})

export class TravelNotesComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    // 在ngOnInit（）{}里面写jQ代码
    // 右侧栏滚动到高度> 475位置时，固定不动（'about_fix'是单独在css中设置的固定时的样式）
    $(window).scroll(function () {
      if ($(window).scrollTop() > 475 && $(window).scrollTop() < 1900) {
        console.log($(window).scrollTop());
        $('.about').addClass('about_fix');
      } else {
        $('.about').removeClass('about_fix');
      }
    });
    /*返回顶部*/
    $(window).scroll(function () {
      let height = $(window).scrollTop();
      console.log(height);
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
}

