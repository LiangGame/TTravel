import { Component, OnInit } from '@angular/core';
declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-strategy-child',
  templateUrl: './strategy-child.component.html',
  styleUrls: ['./strategy-child.component.css']
})
export class StrategyChildComponent implements OnInit {
// tr = false;

  constructor() { }

  ngOnInit() {
    $('.all1').click(function () {
      // this.tr = true;
      $('.tbdiv').animate({height: '920px'}, 500);
      $('.all1').hide();
      $('.all2').show();
      });
    $('.all2').click(function () {
      $('.tbdiv').animate({height: '460px'}, 500);
      $('.all2').hide();
      $('.all1').show();
      });
    $(window).scroll(function () {
      if ($(window).scrollTop() > 475) {
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
