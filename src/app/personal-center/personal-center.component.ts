import { Component, OnInit,Inject, HostListener } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  moduleId: module.id,
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css'],
})
export class PersonalCenterComponent implements OnInit {
  fixed: boolean=false;
  constructor(
    private router: Router,
  ) {}

  @HostListener("window:scroll",[])
  onWindowScroll(){
    let topNum = window.document.body.scrollTop;
    if ( topNum > 460 ) {
      this.fixed = true;
      // console.log(topNum)
    }else {
      this.fixed = false;
    }
  }

  ngOnInit() {
  }

}
