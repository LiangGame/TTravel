import { Component, OnInit } from '@angular/core';

// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [PersonalCenterService]
})
export class NotesComponent implements OnInit {
 _notes:any;
  constructor(
    private perSer: PersonalCenterService,
  ) { }

  ngOnInit() {
    this.getNotes();
  }
  ngOnChanges(){

  }
  ngAfterViewInit(){
    // this.getNotes();
  }
  ngAfterContentChecked(){
    // this.getNotes();
  }

  getNotes(){
    let that = this;
    that.perSer.show_notes(function (result) {
      if(result){
        that._notes=result;
        console.log(that._notes);
        // console.log();
      }else {
        console.log("error")
      }
    })
  }
}
