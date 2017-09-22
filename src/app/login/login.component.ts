import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// 导入服务
import {UserService} from './../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  login_res: string;
  istelempty = true;
  ispassempty = true;
  ispassformat = true;

  constructor(private  userSer: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }
  ontel( value: string ): void {
    let that = this;
    if (value == '' || value == null) {
      that.istelempty = false;
    } else {
      that.istelempty = true;
    }
  }
  onpass( value: string ): void {
    let that = this;
    if (value == '' || value == null) {
      that.ispassempty = false;
      that.ispassformat = true;
    } else {
      that.ispassempty = true;
      if (value.length >= 6) {
        that.ispassformat = true;
        console.log('长度大于6个');
      } else {
        that.ispassformat = false;
        console.log('长度小于6个');
      }
    }
  }
  toLogin(login_form) {
    // console.log(login_form.form.value.telephone);
    let that = this;
    that.userSer.getByPwd(login_form.form.value, function (result) {
      if (result.stateCode == '1') {
        sessionStorage.setItem('userName', result.userName);
        sessionStorage.setItem('userId', login_form.form.value.telephone);
        that.router.navigate(['/index']);
      } else {
        that.login_res = '用户名或密码错误';
      }
    });
  }
}
