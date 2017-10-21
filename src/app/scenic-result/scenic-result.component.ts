import {Component, OnInit} from '@angular/core';
import {ScenicService} from './../services/scenic.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {PersonalCenterService} from "../services/personal-center.service";
import {GlobalPropertyService} from '../services/global-property.service';


@Component({
  selector: 'app-scenic-result',
  templateUrl: './scenic-result.component.html',
  styleUrls: ['./scenic-result.component.css'],
  providers: [ScenicService, PersonalCenterService, GlobalPropertyService],
})
export class ScenicResultComponent implements OnInit {
  scenics: any;
  images: any = [];
  modalInfo: string;
  qnUrl:any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private secninSer: ScenicService,
              private personalSer: PersonalCenterService,
              private glo: GlobalPropertyService) {
    this
      .get_scenic();

    // console.log(this.scenics);
    // console.log('<<<------->>>');
  }

  ngOnInit() {
    this.qnUrl = this.glo.qiniuUrl;
    window.scrollTo(0, 0);
  }
  ;

  get_scenic() {
    this.route.params.subscribe((params: Params) => {
      let id = (<Params>this.route.queryParams).value['key'];
      if (id) {
        let that = this;
        id = {"id": id};
        that.secninSer.getScenicItem(id, function (result) {
          // console.log(id);
          // console.log('>>>>>>>>>');
          if (result) {
            that.scenics = result[0];
            that.images = result[0].url.split(',');
          }
        })
      }
    });
  }

  footprint(id) {
    // console.log('景点ID:' + id);
    let body = {userId: JSON.parse(sessionStorage.getItem('user')).id, scenicId: id};
    let that = this;
    that.personalSer.addFootPorint(body, function (result) {
      if (result) {
        if (result.stateCode == '001') {
          that.modalInfo = '添加成功!';
        } else {
          that.modalInfo = '添加失败!';
        }
      }
    })
  }

}
