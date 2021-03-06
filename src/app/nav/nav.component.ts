import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalPropertyService} from "../services/global-property.service";

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [GlobalPropertyService]

})
export class NavComponent implements OnInit {
  isLogin: boolean = false;
  noLogin: boolean = false;
  userName: string;
  bgColor: boolean = false;
  user: any;
  userIcon: any;
  url: any;

  constructor(private router: Router,
              private glo: GlobalPropertyService) {

  }

  ngOnInit() {
    this.url = this.glo.serverUrl;
  }

  ngAfterContentChecked() {
    let that = this;
    that.user = JSON.parse(sessionStorage.getItem('user'));
    if (sessionStorage.getItem('user')) {
      that.userName = that.user.userName;
      that.userIcon = that.user.icon;
      let len = this.userName.length;
      if (len > 5) {
        that.userName = that.userName.substring(0, 5) + "...";
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
    // sessionStorage.setItem('token',this.user.token);
    sessionStorage.removeItem('user');
    this.router.navigate(['/index']);
  }

}
