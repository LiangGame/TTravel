import { Component, OnInit,Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
// 导入服务
import { UserService } from './../services/user.service';
import { window } from 'rxjs/operator/window';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  moduleId: module.id,
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css'],
  providers: [UserService]

})
export class PersonalCenterComponent implements OnInit {
  fixed: boolean = false;
  uplodBg: boolean = false;
  iconImg: boolean = false;
  Icon: any;
  uploader:FileUploader = new FileUploader({
    url: "http://10.40.4.21:8889/users/upload",
    method: "POST",
    itemAlias: "uploadedfile"
  });

  constructor(
    private router: Router,
    private  userSer: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener("window:scroll",[])
  onWindowScroll(){
    let topNum = this.document.body.scrollTop;
    if ( topNum > 460 ) {
      this.fixed = true;
      // console.log(topNum)
    }else {
      this.fixed = false;
    }
  }

  ngOnInit() {
    this.checkLogin();
    this.iconImg=true;
    console.log(sessionStorage.getItem('userName'));
  }

  uplodBg_toggle() {
    this.uplodBg = !this.uplodBg;
  }

  checkLogin(){
    if(sessionStorage.getItem('userId')){
      let that=this;
      that.userSer.getUser({"telephone":sessionStorage.getItem('userId')},function (result) {
        console.log(result);
        sessionStorage.setItem("sex",result[0].sex);
        sessionStorage.setItem("city_id",result[0].city_id);
        sessionStorage.setItem("birthday",result[0].birthday);
        sessionStorage.setItem("signature",result[0].signature);

        that.Icon=`<img src='http://localhost:4200/assets/user-img/${result[0].icon}' width="100" height="100">`;
        // if(result.stateCode == '6'){
        //   that.router.navigate(['/index']);
        // }else {
        //   alert(result.stateCode);
        //   that.register_res='用户名或密码错误';
        // }
      })
    }
  }
 @HostListener("window:URL",[])
  preview(file) {
    let that =this;
    let img = new Image();
    // img.src = window.URL.createObjectURL(file);
    let url = img.src;
    // var $img = $(img);
    img.onload = function () {
      // window(URL.revokeObjectURL(url));
      // $('#preview').empty().append($img);
      // that.Icon=`<img src='http://localhost:4200/assets/user-img/${result.icon}' width="100" height="100">`;
      that.Icon=`<img src=url width="100" height="100">`;
    }
  }

  uplodImg(event) {

    let file = event.target.files;
    console.log(event);
    let that=this;
    that.preview(file);
    // that.checkLogin();
    that.userSer.addUserIcon(event.target.files,function (result) {
      console.log(result)
      // if(result.stateCode == '6'){
      //   that.router.navigate(['/index']);
      // }else {
      //   alert(result.stateCode);
      //   that.register_res='用户名或密码错误';
      // }
    })
  }
}
