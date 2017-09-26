import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// 导入服务
import {UserService} from './../services/user.service';
import {LocalStorage} from './../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService,LocalStorage]
})
export class LoginComponent implements OnInit {
  login_res: string;
  istelempty = true;
  ispassempty = true;
  ispassformat = true;


  constructor(private  userSer: UserService,
              private  localStorage:LocalStorage,
              private router: Router) {
  }

  ngOnInit() {
    var height = 0;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
      height = document.documentElement.clientHeight;
    }
    document.querySelector('.login-bgimg').setAttribute('style','height:' + height + 'px');
  }
  ontel( value: string ): void {
    let that = this;
    if (value == '' || value == null) {
      that.istelempty = false;
    } else {
      that.istelempty = true;
    }
  }
  onpass( value: string,myform ): void {
    let that = this;
    if (value == '' || value == null) {
      that.ispassempty = false;
      that.ispassformat = true;
    } else {
      that.ispassempty = true;
      if (value.length >= 6) {
        that.ispassformat = true;
        console.log('长度大于6个');
        this.toLogin(myform);
      } else {
        that.ispassformat = false;
        console.log('长度小于6个');
      }
    }
  }

  toLogin(login_form) {
    // console.log(login_form.form.value.telephone);
    let that = this;
    that.userSer.getByPwd(login_form.value, function (result) {
      if (result.stateCode == '1') {
        // 存储token到本地
        that.localStorage.set('token',result.token);
        sessionStorage.setItem('userName', result.userName);
        sessionStorage.setItem('userId', login_form.value.telephone);
        that.router.navigate(['/index']);
      } else {
        that.login_res = '用户名或密码错误';
      }
    });
  }
}
