import {Component, OnInit} from '@angular/core';
import {AuthGuard} from "../../services/auth-guard.service";
import {PersonalCenterService} from "../../services/personal-center.service";
import {ActivatedRoute, Router, Params} from '@angular/router';
import {GlobalPropertyService} from '../../services/global-property.service'


@Component({
  selector: 'app-footprint',
  templateUrl: './footprint.component.html',
  styleUrls: ['./footprint.component.css'],
  providers: [AuthGuard,
    PersonalCenterService,
    GlobalPropertyService]
})
export class FootprintComponent implements OnInit {
  qnurl: any;
  userId: any;
  footprints: any = [];

  constructor(private personalSer: PersonalCenterService,
              private route: ActivatedRoute,
              private router: Router,
              private glo:GlobalPropertyService) {
    if (sessionStorage

        .getItem(
          'user'
        )) {
      this
        .userId = JSON.parse(sessionStorage.getItem('user')).id;
    }

    this.getFootPrint(this.userId);
  }

  ngOnInit() {
    this.qnurl = this.glo.qiniuUrl;
  }

  getFootPrint(userId) {
    let that = this;
    that.personalSer.getAllFootPorint(userId, function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          result[i].url = (result[i].url).split(',')[0];
        }
        that.footprints = result;
        // console.log(that.footprints);
      }
    })
  }

  getScenicItem(scenicId) {
    if (scenicId) {
      this.router.navigate(['/scenic-result'], {queryParams: {'key': scenicId}});
    }
  }

}
