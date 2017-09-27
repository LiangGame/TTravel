import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


// 导入服务
import {UserService} from './../services/user.service';
import {User} from './user.interface';


declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {
  inv = true;
  IsBy = true;
  istelempty = true;
  istelformat = true;
  isname = true;
  ispassempty = true;
  ispassformat = true;
  isrpassempty = true;
  isrpassformat = true;
  iscodeempty = true;
  iscodeformat = true;
  pwd;
  public user: User;
  register_res: string;

  constructor(private  userSer: UserService,
              private router: Router) {
  }
  valid( value: string,myform ): void {
    let that = this;

    // console.log('aaaaa');
    // console.log(this.inv);
    if ( value == '' || value == null) {
      that.iscodeempty = false;
      that.iscodeformat = true;
    }else{
      that.iscodeempty = true;
      that.IsBy = $.idcode.validateCode();
      if (!this.IsBy) {
        this.iscodeformat = false;
      }else if(this.IsBy){
        this.iscodeformat = true;
        this.iscodeempty = true;
        this.addUser(myform);
      }
    }

  }

  ngOnInit() {


    $.idcode.setCode();

    $("#Txtidcode").keydown(function (e) {

      // if (e.keyCode==13) {
      //   this.IsBy = $.idcode.validateCode();
      //   console.log('aaaaa' + this.IsBy);
      // }

    });


    this.user = {
      username: '',
      password: '',
      confirmPassword: ''
    };
    var height = 0;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
      height = document.documentElement.clientHeight;
    }
    document.querySelector('.res-bgimg').setAttribute('style','height:' + height + 'px');
  }

  //
  ontel( value: string ): void {
    let that = this;
    if ( value == '' || value == null) {
      that.istelempty = false;
      that.istelformat = true;
    }else {
      that.istelempty = true;
      if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(value))){
        that.istelformat = false;
      }else{
        that.istelformat = true;

      }
    }
    this.setin();
  }
  onname( value: string ): void {
    let that = this;
    if ( value == '' || value == null) {
    that.isname = false;
    }else {
      that.isname = true;
    }
    this.setin();
  }
  onpass( value: string ): void {
    let that = this;
    that.pwd = value;
    if ( value == '' || value == null) {
      that.ispassempty = false;
      that.ispassformat = true;
    }else {
      that.ispassempty = true;
      if ( value.length >= 6 ) {
        that.ispassformat = true;
        console.log('长度大于6个');
      }
      else {
        that.ispassformat = false;
        console.log('长度小于6个');
      }
    }
    this.setin();
  }
  onrpass( value: string ): void {
    let that = this;
    console.log(that.pwd + ':' + value);
    if (value == '' || value == null) {
      that.isrpassempty = false;
      that.isrpassformat = true;
    } else {
      that.isrpassempty = true;
      if (value != that.pwd) {
        that.isrpassformat = false;
      } else {
        that.isrpassformat = true;
      }
    }
    this.setin();
  }
  setin(){
   this.inv=!(this.istelempty&& this.istelformat
   &&this.isname&&this.ispassempty&&this.ispassformat
   &&this.isrpassempty&&this.isrpassformat&&this.IsBy);
  }
  // 判断两次密码是否一致
  // ispass() {
  //   if (this._password === this._rpassword) {
  //     return true;
  //   }
  //   return false;
  // }
  // 用户注册
  addUser(register_form) {
    // this.IsBy = $.idcode.validateCode();
    // if (!this.IsBy) {
    //   //验证码错误
    //   this.iscodeformat = false;
    // }else if(this.IsBy){
    //   this.iscodeformat = true;
    // }
    if (!(this.istelempty && this.istelformat
      && this.isname && this.ispassempty && this.ispassformat
      && this.isrpassempty && this.isrpassformat && this.IsBy)) {
      return;
    }
    let that = this;
    console.log('click.........');
    console.log(register_form);
    that.userSer.addUser(register_form.value, function (result) {
      console.log(result);
      if (result.stateCode == '6') {
        var user = {telephone:register_form.form.value.telephone,password:register_form.form.value.password}
        that.userSer.getByPwd(user,function (result) {
          // console.log(result);
          // console.log(">>>>>>>>>>>>>>>>>>>>");
          sessionStorage.setItem('user',JSON.stringify(result.users) )
          that.router.navigate(['/index']);
        })
      }
      if (result.stateCode == '7') {
        that.register_res = '用户已注册';
      }

    });
  }

  save(model: User, isValid: boolean) {
    // call API to save customer
    console.log(model, isValid);
  }
}
