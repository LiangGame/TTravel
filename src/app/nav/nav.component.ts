import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
declare var $:any;

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
  user:any;
  userIcon:any;
  constructor(private router: Router) {
  }

  ngOnInit() {
    // 禁用点击展开
    $(document).ready(function(){
      $(document).off('click.bs.dropdown.data-api');
    });

    $(document).ready(function(){
      dropdownOpen();//调用
    });
    // 鼠标划过就展开子菜单，免得需要点击才能展开
    function dropdownOpen() {
      var $dropdownLi = $('.dropdown');
      // console.log($dropdownLi);
      $dropdownLi.mouseover(function() {
        // console.log($(this));
        $(this).addClass('open');
      }).mouseout(function() {
        $(this).removeClass('open');
      });
    }


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
