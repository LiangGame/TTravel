import {Component, OnInit, ViewChild} from '@angular/core';

// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';


import {EditorComponent} from './../../editor/editor.component'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [PersonalCenterService]
})
export class NotesComponent implements OnInit {
  _notes: any = [];
  newNotes: any = [];
  _img: any = /<img\s+.*?>/;
  len: number = 0;
  pageIndex: number = 0;//当前页
  // recordSize: number;//数据总长度
  pageSize: number = 2;//每页显示内容数量
  pageCount: number;//总页数
  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor(private perSer: PersonalCenterService,) {
  }

  ngOnInit() {
    this.getNotes();
    console.log(this.pageCount);
  }

  ngAfterViewInit() {
  //   console.log(this.len);
  //   this.recordSize = this.len;//数据总长度
  //   this.pageCount = Math.ceil(this.recordSize / this.pageSize);//总页数
  }

  getNotes() {
    let that = this;
    that.perSer.show_notes(function (result) {
      if (result) {
        // that.len = result.length;
        that.pageCount = Math.ceil(result.length / that.pageSize);//总页数
        console.log(result);
        that._notes = result;
        that.pageTabs(that._notes);
      } else {
        console.log("error")
      }
    })
  }

  // 分页
  pageTabs(notes) {
    // let that = this;
    let star = this.pageSize * this.pageIndex,
      end = this.pageSize * this.pageIndex + (this.pageSize - 1);
    console.log('========================================');

    for (let i = star; i <= end; i++) {
      console.log(i);

      this.newNotes[i] = notes[i];
    }
    console.log('新数组');
    console.log(this.newNotes);
  }

  Older() {
    console.log('older');
    let that = this;
    if (that.pageIndex > 0) {
      that.pageIndex--;
      that.pageTabs(that.newNotes);
    } else if (that.pageIndex === 0) {

    }
  }

  Newer() {
    console.log('newer');
    let that = this;
    console.log(that.pageIndex + '当前页');
    console.log(that.pageCount + '总页数');

    if (that.pageIndex < that.pageCount - 1) {
      that.pageIndex++;
      that.pageTabs(that.newNotes);
    } else if (that.pageIndex === that.pageCount - 1) {

    }
  }
}
