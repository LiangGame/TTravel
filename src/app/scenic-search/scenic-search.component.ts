import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
// 导入服务
import {ScenicService} from './../services/scenic.service';
import {GlobalPropertyService} from '../services/global-property.service';

@Component({
  selector: 'app-scenic-search',
  templateUrl: './scenic-search.component.html',
  styleUrls: ['./scenic-search.component.css'],
  providers: [ScenicService, GlobalPropertyService],

})
export class ScenicSearchComponent implements OnInit {
  qnUrl: any;
  private data: any;
  private key: any;
  // private cityName:any;
  city: any;
  cityinfo: any;
  @Input() searText: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private scenicSer: ScenicService,
              private glo: GlobalPropertyService) {
  }

  ngOnInit() {
    this.qnUrl = this.glo.qiniuUrl;
    window.scrollTo(0, 0);
    this.route.params.subscribe((params: Params) => {
      this.key = (<Params>this.route.queryParams).value['key'];
      if (this.key) {
        let that = this;
        that.scenicSer.get_scenic(function (result) {
          if (result) {
            for (let i = 0; i < result.length; i++) {
              if (result[i].url == '' || result[i].url == null) {
                continue;
              } else {
                result[i].url = (result[i].url).split(',');
              }
              that.city = result[0].cityname;
              if (result[i].cityname.indexOf(that.key) != -1
                || result[i].title.indexOf(that.key) != -1
                || result[i].info.indexOf(that.key) != -1) {
                // console.log(result[i].cityinfo);
                that.cityinfo = result[i].cityinfo;
              }
              // console.log(result[i].url);
            }
            that.data = result;
            that.searText = that.key;
          } else {
            console.log('error');
          }
        });
      }
    })
  }

  details(deta) {
    console.log(deta);

    if (deta) {
      this.router.navigate(['/scenic-result'], {queryParams: {'key': deta}});
    }
  };

}
