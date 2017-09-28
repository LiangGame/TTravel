import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scenic',
  templateUrl: './scenic.component.html',
  styleUrls: ['./scenic.component.css']
})
export class ScenicComponent implements OnInit {

 menus:any = ['俯瞰城市','山水相依','最爱小镇','古迹遗址','魅力夜色'];
  constructor() { }

  ngOnInit() {
  }
  title = 'Angular 4.x NgSwitch';
  private num = 0;
  changeElement(): void {
    if (this.num > 3) {
      this.num = 0;
    }
    this.num++;
  }
}
