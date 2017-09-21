import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// 导入服务
import { IndexService } from './../services/index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [IndexService]
})
export class IndexComponent implements OnInit {
  _scenic: any;
  _notes: any;
  newscenic: string;
  newNotes: string;

  constructor( private indexSer: IndexService

  ) { }

  ngOnInit() {
    this.getScenic();
    this.getNotes();
  }
  getScenic(){
    let that = this;
    that.indexSer.show_scenic(function (result) {
      console.log('成功')
      if(result){
        that._scenic=result;
        // that.newscenic=result[0];
        console.log(that._scenic);
        // console.log();
      }else {
        console.log("error")
      }
    })
  }
  getNotes(){
    let that = this;
    that.indexSer.show_notes(function (result) {
      if(result){
        that._notes=result;
        that.newNotes=result[0];
        console.log(that._notes);
        // console.log();
      }else {
        console.log("error");
      }
    })
  };


}
