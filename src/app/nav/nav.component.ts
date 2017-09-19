import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogin: boolean = false;
  noLogin: boolean = false;
  userName: string;
  bgColor: boolean = false;

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterContentChecked() {
    let that = this;
    if (sessionStorage.getItem('userName')) {
      that.userName = sessionStorage.getItem('userName');  /*.substring(0,5)+"..."*/
      let len = this.userName.length;
      if(len > 5){
        that.userName = that.userName.substring(0,5)+"...";
      }
      that.isLogin = true;
      that.noLogin = false;
    } else {
      that.isLogin = false;
      that.noLogin = true;
    }
  }
  bgToggle() {
    this.bgColor = !this.bgColor;
  }

}
