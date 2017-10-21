import {Component, OnInit} from '@angular/core';
import {StrategyService} from './../services/strategy.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {GlobalPropertyService} from "../services/global-property.service";

declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-travel-strategy',
  templateUrl: './travel-strategy.component.html',
  styleUrls: ['./travel-strategy.component.css'],
  providers: [StrategyService,GlobalPropertyService]
})
export class TravelStrategyComponent implements OnInit {
  qnUrl:any;
  strategys: any;
  key: any;
  searText: string;

  constructor(private gySer: StrategyService,
              private route: ActivatedRoute,
              private router: Router,
              private glo:GlobalPropertyService) {
  }

  ngOnInit() {
    this.qnUrl = this.glo.qiniuUrl;
    window.scrollTo(0,0);
    this.getStrategys();
  }

  ngAfterContentChecked() {
    this.route.params.subscribe((params: Params) => {
      this.key = (<Params>this.route.queryParams).value['key'];
    })
    if (decodeURI(location.search).split('=')[1] == this.key) {
      this.searText = this.key;
    }
  }

  getStrategys() {
    let that = this;
    that.gySer.getStrategy(function (result) {
      if (result) {
        that.strategys = result;
        // console.log(that.strategys);
      } else {
        // console.log('here');
      }
    });
  };

  strategyItem(strategyId) {
    // console.log(strategyId);
    if (strategyId) {
      this.router.navigate(['/strategychild'], {queryParams: {'key': strategyId}});
    }
  }

  add(event) {
      // console.log('只执行一次');
      $(event.target).addClass('animated infinite swing');
      window.setTimeout(function () {
        $(event.target).removeClass('animated infinite swing');
      },800)

  }

  remove(event) {
    $(event.target).removeClass('animated infinite swing');
  }
}
