import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router'
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

  constructor(
    private router:Router
  ) {

  }

  ngOnInit() {

  }

  ngAfterContentChecked() {
    let that = this;
    if (sessionStorage.getItem('user')) {
      that.userName = JSON.parse(sessionStorage.getItem('user')).userName;  /*.substring(0,5)+"..."*/
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
  signOut() {
    sessionStorage.clear();
    this.router.navigate(['/index']);
  }
}
