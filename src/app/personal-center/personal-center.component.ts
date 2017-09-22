import {Component, OnInit, Inject, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


// 导入服务
import {UserService} from './../services/user.service';
import {PersonalCenterService} from './../services/personal-center.service';
// import { window } from 'rxjs/operator/window';
import {DOCUMENT} from "@angular/platform-browser";

@Component({
  moduleId: module.id,
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css'],
  providers: [UserService, PersonalCenterService]

})
export class PersonalCenterComponent implements OnInit {
  fixed: boolean = false;
  uplodBg: boolean = false;
  iconImg: boolean = false;
  _telephone: any = sessionStorage.getItem("userId");
  Icon: any;
  uploader: FileUploader = new FileUploader({
    url: "http://10.40.4.21:8889/users/upload",
    method: "POST",
    itemAlias: "uploadedfile",
  });

  constructor(
    private router: Router,
    private http: HttpClient,
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
    this.iconImg = true;
    // console.log(sessionStorage.getItem('userName'));
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

        that.Icon=`<img src=''http://localhost:8889/uploads/${result[0].icon}' width="100" height="100">`;
        // if(result.stateCode == '6'){
        //   that.router.navigate(['/index']);
        // }else {
        //   alert(result.stateCode);
        //   that.register_res='用户名或密码错误';
        // }
      })
    }
  }


  uplodImg(event) {
    let that = this;
    // that.Icon = `<img src='http://localhost:8889/uploads/${tempRes.icon}' width="100" height="100">`;
    that.uploader.queue[0].onSuccess = (response, status, headers) => {
      // 上传文件成功
      if (status == 200) {
        // alert('上传文件成功')
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        console.log(tempRes);
        if(tempRes.affectedRows == 1){
          that.Icon = `<img src='http://localhost:8889/uploads/${tempRes.icon}' width="100" height="100">`;
        }
        // console.log(that.Icon);
      } else {
        // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
    console.log(this.uploader.queue[0]);
    console.log('>>>>>>>>>>>>');
    // let file : FileItem;
    // file = event.target.files;
    // console.log(file);
    // console.log('<<<<<------>>>>');
    // this.uploader.uploadItem(file);
    this.uploader.onBuildItemForm = this.buildItemForm;
  }

  buildItemForm(fileItem:any, form: any): any {
    let that = this;
    if (!fileItem["realFileName"]) {
      that._telephone = sessionStorage.getItem("userId");
      console.log("上传之前");
      console.log(fileItem);
      form.append("telephone",that._telephone);
    }
  }
}
