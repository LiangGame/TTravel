import {Component, OnInit} from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

      $(function () {
        var h = $(window).height();
        $('body').height(h);
        $('.mianBox').height(h);
        centerWindow(".tipInfo");
      });

    //2.将盒子方法放入这个方，方便法统一调用
    function centerWindow(a) {
      center(a);
      //自适应窗口
      $(window).bind('scroll resize',
        function () {
          center(a);
        });
    }

    //1.居中方法，传入需要剧中的标签
    function center(a) {
      var wWidth = $(window).width();
      var wHeight = $(window).height();
      var boxWidth = $(a).width();
      var boxHeight = $(a).height();
      var scrollTop = $(window).scrollTop();
      var scrollLeft = $(window).scrollLeft();
      var top = scrollTop + (wHeight - boxHeight) / 2;
      var left = scrollLeft + (wWidth - boxWidth) / 2;
      $(a).css({
        "top": top,
        "left": left
      });
    }

    (function () {
      var wait = document.getElementById('wait'), href = document.getElementById('href').href;
      var interval = setInterval(function () {
        var time = --wait.innerHTML;
        if (time <= 0) {
          location.href = href;
          clearInterval(interval);
        }
        ;
      }, 1000);
    })();
  }

}
