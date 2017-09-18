import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// 导入服务
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
 login_res: string;
  constructor(
    private  userSer: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  toLogin(login_form){
    let that = this;
    that.userSer.getByPwd(login_form.form.value, function (result) {
      if (result.stateCode == '1'){
        that.router.navigate(['/index']);
      }else {
        alert(result.stateCode);
        that.login_res = '用户名或密码错误';
      }
    });
  }
}
