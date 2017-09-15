import { Component, OnInit } from '@angular/core';

// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css'],
  providers: [PersonalCenterService]
})
export class UserIndexComponent implements OnInit {
 _notes: any;
  constructor(
    private perSer: PersonalCenterService,
  ) { }

  ngOnInit() {
    this.getNotes();
  }
  getNotes(){
    let that = this;
    that.perSer.show_notes(function (result) {
      console.log(result);
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
