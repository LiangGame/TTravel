import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
declare var $: any;
declare var AMap: any;
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
// 导入服务
import {IndexService} from './../services/index.service';
import {UserService} from "../services/user.service";
import {GlobalPropertyService} from "../services/global-property.service";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [IndexService, UserService,GlobalPropertyService]
})
export class IndexComponent implements OnInit {
  _scenic: any = [];
  _notes: any = [];
  newscenic: string;
  newNotes: string;
  user: any;
  reg: any = /<img\s+.*?>/g;
  url:any;
  qnUrl:any;
  // cityinfo:any;
  // credits: number;

  constructor(private indexSer: IndexService,
              private route: ActivatedRoute,
              private router: Router,
              private userSer: UserService,
              private glo:GlobalPropertyService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getScenic();
    this.getNotes();

  }

  ngOnInit() {
    this.url = this.glo.serverUrl;
    this.qnUrl = this.glo.qiniuUrl;
    let that =this;
    if(!!sessionStorage.getItem('token')){
      $('#modal').modal({backdrop: false});
      window.setTimeout(function () {
        $('#modal').modal('hide');
        sessionStorage.removeItem('token');
      },2000);
    };
    window.scrollTo(0,0);
  }
  ngAfterContentInit(){

  }

  getScenic() {
    let that = this;
    that.indexSer.show_scenic(function (result) {
      // console.log('成功')
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].url == '' || result[i].url == null) {
            continue;
          } else {
            result[i].url = (result[i].url).split(',');
          }
        }
        that._scenic = result;
        // console.log(that._scenic);
      } else {
        console.log("error")
      }
    })
  }




  getNotes() {
    let that = this;
    that.indexSer.show_notes(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(that.reg)) {
            result[i].content = ((result[i].content).match(that.reg)[0]);
          }
        }
        that._notes = result;
        // that.newNotes = result[0];
        // console.log(that._notes);
        // console.log();
      } else {
        console.log("error");
      }
    })
  };

  detail_1(theme) {
    if (theme) {
      this.router.navigate(['/scenic-result'], {queryParams: {'key': theme}})
    }
  }

  detail_2(topic) {
    if (topic) {
      this.router.navigate(['/noteschild'], {queryParams: {'key': topic}})
    }
  }




}
