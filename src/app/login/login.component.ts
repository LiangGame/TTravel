import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// 导入服务
import {UserService} from './../services/user.service';
import {LocalStorage} from './../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, LocalStorage]
})
export class LoginComponent implements OnInit {
  login_res: string;
  istelempty = true;
  ispassempty = true;
  ispassformat = true;
  credits: number;

  constructor(private  userSer: UserService,
              private  localStorage: LocalStorage,
              private router: Router) {
  }

  ngOnInit() {
    var height = 0;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
      height = document.documentElement.clientHeight;
    }
    document.querySelector('.login-bgimg').setAttribute('style', 'height:' + height + 'px');
    window.scrollTo(0,0);
  }

  ontel(value: string): void {
    let that = this;
    if (value == '' || value == null) {
      that.istelempty = false;
    } else {
      that.istelempty = true;
    }
  }

  onpass(value: string, myform): void {
    let that = this;
    if (myform) {
      if (value == '' || value == null) {
        that.ispassempty = false;
        that.ispassformat = true;
      } else {
        that.ispassempty = true;
        if (value.length >= 6) {
          that.ispassformat = true;
          // console.log('长度大于6个');
          this.toLogin(myform);
        } else {
          that.ispassformat = false;
          // console.log('长度小于6个');
        }
      }
    }
  }


  toLogin(login_form) {
    if (login_form) {
      let that = this;
      that.userSer.getByPwd(login_form.form.value, function (result) {
        if (result.stateCode == '1') {
          // 存储token到本地
          that.localStorage.set('token', result.token);
          sessionStorage.setItem('user', JSON.stringify(result.users[0]));
          sessionStorage.setItem('token',result.users[0].token);
          that.getCredits(login_form.form.value.telephone);
        } else {
          that.login_res = '用户名或密码错误';
        }
      });
    }
  }

  // 获取用户积分
  getCredits(userId) {
    if (userId) {
      let that = this;
      that.userSer.getCredits({telephone:userId}, function (result) {
        console.log(result);
        if (result) {
          if (result != '' || result != null) {
            that.credits = +result[0].userlv;
            console.log('==========获取数据成功---->>>getCredits=========');
            that.userSer.addCredits({telephone: userId, creits: (+that.credits + 2)}, function (result) {
              if (result.affectedRows == 1) {
                that.router.navigate(['/index']);
                console.log(result);
                console.log('登录成功,积分+2');
              }
            });
          }
        }
      });
    }
  }

}
