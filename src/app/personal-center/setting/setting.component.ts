import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  _years: any=[];
  _months: any=[];
  _days: any=[31,28,31,30,31,30,31,31,30,31,30,31];
  _day: any=[];
  nowYear: number= new Date().getFullYear();
  _show: boolean = false;
  year: string='';
  _month: string='';
  _dy: string='';
  constructor() { }

  ngOnInit() {
    for(let i = 0,y = this.nowYear; y >= 1950;i++) {
      this._years[i] = y;
      y-=1;
    };
    for(let i = 0;i <= 12; i++){
      this._months[i] = i+1;
    };
    if(this.isLeap(this.year)){
      this._days[1] = 29;
    }else{
      this._days[1] = 28;
    };
  }
  ngDoCheck() {
    this._day=[];
    for(let i = 0 ; i < this._days[+this._month-1] ; i++){
      this._day[i]=i+1;
    }
  }
  isLeap(year){
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
  show_toggle(event) {
    this._show=!this._show;
    console.log(event)
  }
  show_year(event) {
    this.year=event.target.innerText;
    this._show=!this._show;
  }
  show_month(event) {
    this._month=event.target.innerText;
    this._show=!this._show;
  }
  show_day(event) {
    this._dy=event.target.innerText;
    this._show=!this._show;
  }
}
