import {Component, OnInit} from '@angular/core';
import {StrategyService} from './../services/strategy.service';
import {ActivatedRoute, Router, Params} from '@angular/router';


@Component({
  selector: 'app-travel-strategy',
  templateUrl: './travel-strategy.component.html',
  styleUrls: ['./travel-strategy.component.css'],
  providers: [StrategyService]
})
export class TravelStrategyComponent implements OnInit {
  strategys: any;
  key: any;
  searText: string;

  constructor(private gySer: StrategyService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getStrategys();
  }

  ngAfterContentChecked() {
    this.route.params.subscribe((params: Params) => {
      this.key = (<Params>this.route.queryParams).value['key'];})
    if(decodeURI(location.search).split('=')[1] == this.key){
      this.searText = this.key;
    }
  }

  getStrategys() {
    let that = this;
    that.gySer.getStrategy(function (result) {
      if (result) {
        that.strategys = result;
        console.log(that.strategys);
      } else {
        console.log('here');
      }
    });
  };

  strategyItem(strategyId){
    console.log(strategyId);
    if (strategyId) {
      this.router.navigate(['/strategychild'], {queryParams: {'key': strategyId}});
    }
  }

}
