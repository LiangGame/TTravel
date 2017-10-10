import {Component, OnInit, Input, Inject, HostListener} from '@angular/core';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router, Params} from '@angular/router';


// 导入服务
import {UserService} from './../services/user.service';
import {PersonalCenterService} from './../services/personal-center.service';
import {GlobalPropertyService} from './../services/global-property.service'
// import { window } from 'rxjs/operator/window';
import {DOCUMENT} from "@angular/platform-browser";
import {AuthGuard} from "../services/auth-guard.service";

@Component({
  moduleId: module.id,
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css'],
  providers: [GlobalPropertyService, UserService, PersonalCenterService, AuthGuard]

})
export class PersonalCenterComponent implements OnInit {
  url: string;
  fixed: boolean = false;
  uplodBg: boolean = false;
  iconImg: boolean = false;
  _telephone: any;
  user: any = JSON.parse(sessionStorage.getItem('user'));
  Icon: any;
  man: boolean = false;
  wumen: boolean = false;

  // uploader:any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private  userSer: UserService,
              private glo: GlobalPropertyService,
              @Inject(DOCUMENT) private document: Document) {
    this.route.params.subscribe((params: Params) => {
      let id = (<Params>this.route.queryParams).value['key'];
    });
    if (this.user.sex == 0) {
      this.man = true;
      this.wumen = false;
    } else {
      this.man = false;
      this.wumen = true;
    }
  }

  uploader: FileUploader = new FileUploader({
    url: this.glo.serverUrl + "/users/upload",
    method: "POST",
    itemAlias: "uploadedfile",
  })

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let topNum = this.document.body.scrollTop;
    if (topNum > 500) {
      this.fixed = true;
      // console.log(topNum)
    } else {
      this.fixed = false;
    }
  }

  ngOnInit() {
    this.url = this.glo.serverUrl;
    window.scrollTo(0,0);
    this.checkLogin();
    this.iconImg = true;
    // console.log(sessionStorage.getItem('userName'));
    this.iconImg = true;
    // console.log(sessionStorage.getItem('userName'));
  }

  uplodBg_toggle() {
    this.uplodBg = !this.uplodBg;
  }

  checkLogin() {
    if (this.user.telephone) {
      let that = this;
      that.userSer.getUserIcon({"telephone": that.user.telephone}, function (result) {
        // console.log(result);
        // sessionStorage.setItem("sex",result[0].sex);
        // sessionStorage.setItem("user_id",result[0].id);
        // sessionStorage.setItem("city_id",result[0].city_id);
        // sessionStorage.setItem("birthday",result[0].birthday);
        // sessionStorage.setItem("signature",result[0].signature);

        that.Icon = `<img src='${that.url}/uploads/${result[0].icon}' width="100" height="100">`;
      })
    }
  }


  uplodImg(event) {
    let that = this;
    // that.Icon = `<img src='http://localhost:8889/uploads/${tempRes.icon}' width="100" height="100">`;
    that.uploader.queue[0].onSuccess = (response, status, headers) => {
      // 上传文件成功
      if (status == 200) {
        that.uploader.clearQueue();
        // alert('上传文件成功')
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        // console.log(tempRes);
        if (tempRes.affectedRows == 1) {
          that.Icon = `<img src='http://127.0.0.1:8889/uploads/${tempRes.icon}' width="100" height="100">`;
        }
        // console.log(that.Icon);
      } else {
        // 上传文件后获取服务器返回的数据错误
      }
    };
    that.uploader.onBuildItemForm = that.buildItemForm;
    that.uploader.queue[0].upload(); // 开始上传
  }

  buildItemForm(fileItem: any, form: any): any {
    let that = this;
    if (!fileItem["realFileName"]) {
      that._telephone = JSON.parse(sessionStorage.getItem("user")).telephone;
      console.log("上传之前");
      // console.log(fileItem);
      form.append("telephone", that._telephone);
    }
  }
}
