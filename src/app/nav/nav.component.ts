import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 isLogin: boolean=false;
 noLogin: boolean=false;
 userName: string;
  constructor(
  ) {

  }

  ngOnInit() {

  }
  ngAfterContentChecked(){
    let that=this;
    if(sessionStorage.getItem('userName')){
      this.userName=sessionStorage.getItem('userName');
      that.isLogin=true;
      that.noLogin=false;
    }else{
      that.isLogin=false;
      that.noLogin=true;
    }
  }



}
