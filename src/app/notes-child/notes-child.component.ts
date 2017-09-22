import { Component, OnInit } from '@angular/core';
// declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-notes-child',
  templateUrl: './notes-child.component.html',
  styleUrls: ['./notes-child.component.css']
})
export class NotesChildComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*返回顶部*/
    // $(window).scroll(function () {
    //   let height = $(window).scrollTop();
    //   console.log(height);
    //   if (height > 475) {
    //     $('#to_top').show();
    //   } else if (height <= 475) {
    //     $('#to_top').hide();
    //   }
    // });
    // $('#to_top').click(function () {
    //   let height = $(window).scrollTop();
    //   let inter = setInterval(function () {
    //     if (height > 0) {
    //       height -= 20;
    //     } else {
    //       clearInterval(inter);
    //     }
    //     $(window).scrollTop(height);
    //   }, 10);
    // });
  }
}
