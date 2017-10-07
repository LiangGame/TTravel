import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
declare var $: any;
declare var AMap: any;
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
// 导入服务
import {IndexService} from './../services/index.service';
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [IndexService, UserService]
})
export class IndexComponent implements OnInit {
  _scenic: any = [];
  _notes: any = [];
  newscenic: string;
  newNotes: string;
  user: any;
  // cityinfo:any;
  // credits: number;

  constructor(private indexSer: IndexService,
              private route: ActivatedRoute,
              private router: Router,
              private userSer: UserService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getScenic();
    this.getNotes();
    this.getHeroes();
  }

  ngOnInit() {
    let that =this;
    if(!!sessionStorage.getItem('token')){
      $('#modal').modal({
        backdrop: false
      });
      window.setTimeout(function () {
        $('#modal').modal('hide');
        sessionStorage.removeItem('token');
      },2000);
    };

  }
  ngAfterContentInit(){

  }

  getScenic() {
    let that = this;
    that.indexSer.show_scenic(function (result) {
      console.log('成功')
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].url == '' || result[i].url == null) {
            continue;
          } else {
            result[i].url = (result[i].url).split(',');
          }
        }
        that._scenic = result;
        console.log(that._scenic);
      } else {
        console.log("error")
      }
    })
  }




  getNotes() {
    let that = this;
    that.indexSer.show_notes(function (result) {
      if (result) {
        that._notes = result;
        that.newNotes = result[0];
        console.log(that._notes);
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


  getHeroes() {
    this.indexSer.getHeroesSlowly().then(heroes => this._scenic = heroes);
  }

}
