import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare var $:any;
// 导入服务
import {PersonalCenterService} from './../../services/personal-center.service';
import {UserService} from './../../services/user.service';
import {AuthGuard} from "../../services/auth-guard.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [PersonalCenterService, UserService, AuthGuard]
})
export class SettingComponent implements OnInit {
  _years: any = [];
  _months: any = [];
  _days: any = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];// 每月的天数,2月天数在面函数中判断
  _day: any = [];
  nowYear: number = new Date().getFullYear(); // 获取当前年份
  year: string = '';
  _month: string = '';
  _dy: string = '';
  _province: string = '';
  _provinces: any = [];
  _city: string = '';
  _citys: any = [];
  _cityId: any = [];
  cityId: string;
  year_block: boolean = true;
  month_block: boolean = true;
  day_block: boolean = true;
  province_block: boolean = true;
  city_block: boolean = true;
  userName: string;
  readonly: string = 'readonly';
  nameBorder: boolean = false;
  user: any;
  _telephone: string = JSON.parse(sessionStorage.getItem('user')).telephone;
  sex: string;
  city_id: string;
  birthday: string;
  signature: string;
  men: string;
  wumen: string;


  constructor(private perSer: PersonalCenterService,
              private router: Router,
              private  userSer: UserService) {
    this.getuser();
  }

  ngOnInit() {
    // 循环至当前年份
    for (let i = 0, y = this.nowYear; y >= 1950; i++) {
      this._years[i] = y;
      y -= 1;
    }
    ;
    // 循环12个月
    for (let i = 0; i < 12; i++) {
      if (i < 9) {
        let m = '0' + (i + 1);
        this._months[i] = m;
      } else {
        this._months[i] = i + 1;
      }
    }
    ;
    // 调用获取地址函数
    this._address();
  }

// 循环当前月份天数
  ngDoCheck() {
    this._day = [];
    for (let i = 0; i < this._days[+this._month - 1]; i++) {
      this._day[i] = i + 1;
    }
  }

// 获取地址函数
  _address() {
    let that = this;
    that.perSer.show_province(function (result) {
      if (result) {
        for (let i = 0; i < result.province.length; i++) {
          that._provinces[i] = result.province[i].provincename;
        }
      } else {
        console.log('here');
      }
    });
  }

// 判断是否闰年函数
  isLeap(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }

// 下拉列表显示/隐藏
  show_year_toggle() {
    this.year_block = !this.year_block;
  }

  show_month_toggle() {
    this.month_block = !this.month_block;
  }

  show_day_toggle() {
    this.day_block = !this.day_block;
  }

  show_province_toggle() {
    this.province_block = !this.province_block;
  }

  show_city_toggle() {
    this.city_block = !this.city_block;
  }

// 获取选择的年月日信息
  show_year(event) {
    this.year = event.target.innerText;
    this.year_block = !this.year_block;
    // 判断是否为闰年,决定2月天数
    if (this.isLeap(this.year)) {
      this._days[1] = 29;
    } else {
      this._days[1] = 28;
    }
  }

  show_month(event) {
    this._month = event.target.innerText;
    this.month_block = !this.month_block;
  }

  show_day(event) {
    this._dy = event.target.innerText;
    this.day_block = !this.day_block;
  }

// 获取选择的地址信息
  show_province(event) {
    // console.log(event);
    let that = this;
    that._province = event.target.innerText;
    // console.log(that._province);
    that.perSer.show_citys(that._province, function (result) {
      console.log(result);
      console.log('>>>>>show_citys>>>setting');
      if (result) {
        that._citys = [];  // 初始化城市列表
        that._city = '';   // 清空已选择城市信息
        that._cityId = [];
        for (let i = 0; i < result.length; i++) {
          that._citys[i] = result[i].cityname;
          that._cityId[i] = result[i].cityid;
        }
      } else {
        console.log('here');
      }
    });
    this.province_block = !this.province_block;
  }

  show_city(event) {
    this._city = event.target.innerText;
    this.city_block = !this.city_block;
  }

  check_name() {
    this.readonly = '';
    this.nameBorder = true;
  }

  // 获取个人资料
  getuser() {
    let that = this;
    that.userSer.getUser(that._telephone, function (result) {
      that.user = result[0];
      that.userName = that.user.userName;
      that.sex = that.user.sex;
      that.city_id = that.user.city_id;
      that.birthday = that.user.birthday;
      that.signature = that.user.signature;
      // 判断性别
      if (that.sex == '0') {
        that.men = "checked";
      } else {
        that.wumen = "checked";
      }
      // 读取生日数据
      if (that.birthday != 'null') {
        that.year = that.birthday.split('T')[0].split('-')[0];
        that._month = that.birthday.split('T')[0].split('-')[1];
        that._dy = '' + (+(that.birthday.split('T')[0].split('-')[2]) + 1);
      }
      // 居住地信息显示
      if (that.city_id != 'null') {
        that.perSer.getCity(that.city_id, function (result) {
          // console.log(result);
          // console.log('>>>>>seeting>>>getCity');
          if (result) {
            that._province = result[0].provincename;
            that._city = result[0].cityname;
          } else {
            // console.log('error   >>>>>getCity');
          }
        });
      }
    })
  }

// 修改个人资料
  _submit(user_form) {
    let that = this;
    // console.log(user_form.form.value);
    let user = [user_form.form.value, {"telephone": this._telephone}];
    user_form.form.value.city = that._cityId[that._citys.indexOf(that._city)];
    if (!user_form.form.value.city) {
      user_form.form.value.city = that.city_id;
    }
    that.userName = user_form.form.value.userName;
    that.sex = user_form.form.value.userSex;
    that.birthday = user_form.form.value.birthday;
    that.userSer.updateUser(user, function (result) {
      if(result){
        $('#modal').modal({
          backdrop: false
        });
        window.setTimeout(function () {
          $('#modal').modal('hide');
        },2000);
        sessionStorage.setItem('userName', that.userName);
        // that.userName=sessionStorage.getItem('userName');
        // console.log(result);
        // console.log('>>>>>submit');
      }

    })
  }
}
