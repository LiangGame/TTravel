import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router, Params} from '@angular/router';
import {NotesService} from './../services/notes.service';

declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-notes-child',
  templateUrl: './notes-child.component.html',
  styleUrls: ['./notes-child.component.css'],
  providers: [NotesService],
})
export class NotesChildComponent implements OnInit {
  notes: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesSer:NotesService
  ) {
    this.get_note();
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

  get_note(){
    this.route.params.subscribe((params: Params) => {
      let id = (<Params>this.route.queryParams).value['key'];
      if (id) {
        let that = this;
        id = {"id":id};
        that.notesSer.getnotesItem(id,function (result) {
          // console.log(id);
          // console.log('>>>>>>>>>');
          if(result){
            that.notes = result[0];
            console.log(that.notes);
            // that.images = result[0].url.split(',');
          }
        })
      }
    });
  }
}
