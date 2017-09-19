import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


// 导入服务
import { UserService } from './../services/user.service';
import { User } from './user.interface';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  register_res: string;
  constructor(
    private  userSer: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: '',
      confirmPassword: ''
    }
  }



  // 判断两次密码是否一致
  // ispass() {
  //   if (this._password === this._rpassword) {
  //     return true;
  //   }
  //   return false;
  // }
  // 用户注册
  addUser(confirmPassword_from) {
    let that = this;
    that.userSer.addUser(confirmPassword_from.form.value, function (result) {
      if (result.stateCode == '6') {
        sessionStorage.setItem('userName', confirmPassword_from.form.value.userName);
        sessionStorage.setItem('userId', confirmPassword_from.form.value.telephone);
        that.router.navigate(['/index']);
      }else {
        that.register_res = '用户名或密码错误';
      }
    });
  }
  save(model: User, isValid: boolean) {
    // call API to save customer
    console.log(model, isValid);
  }
}
