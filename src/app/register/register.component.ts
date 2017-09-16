import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// 导入服务
import { UserService } from './../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
 _password: string;
 _rpassword: string;
 register_res: string;
  constructor(
    private  userSer: UserService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  // 判断两次密码是否一致
  ispass() {
    if (this._password === this._rpassword) {
      return false;
    }
    return true;
  }
  // 用户注册
  addUser(register_from) {
    let that=this;
    that.userSer.addUser(register_from.form.value,function (result) {
      if(result.stateCode == '6'){
        that.router.navigate(['/index']);
      }else {
        alert(result.stateCode);
        that.register_res='用户名或密码错误';
      }
    })
  }
}
