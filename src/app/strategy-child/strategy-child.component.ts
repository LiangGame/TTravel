import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {StrategyService} from './../services/strategy.service'
declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-strategy-child',
  templateUrl: './strategy-child.component.html',
  styleUrls: ['./strategy-child.component.css'],
  providers: [StrategyService]
})
export class StrategyChildComponent implements OnInit {
// tr = false;
  private key: any;
  data: any;
  lessRoute:any = [];
  MoreRoute:any = [];
  more:string = "展开全部几天行程";
  _more:boolean=false;
  up:string = 'down';
  searText: any;
  noRoute: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private gySer: StrategyService) {
    this.route.params.subscribe((params: Params) => {
      this.key = (<Params>this.route.queryParams).value['key'];
      // console.log(this.key);
      if (this.key) {
        let that = this;
        let styategyId = {styategyId: this.key}
        // console.log(styategyId);
        that.gySer.getStrategyItem(styategyId, function (result) {
          // console.log(result);
          // console.log('===================strategy-child=====================');
          if (result) {
            if(result[0].route_title && result[0].route_content){
              result[0].route_title = (result[0].route_title).split(',');
              result[0].route_content = (result[0].route_content).split(',');
              if(result[0].route_title.length <= 5){
                for(let a=0,i = 5; i < result[0].route_title.length; a++,i++){
                  that.MoreRoute[a] = {title:result[0].route_title[i],content:result[0].route_content[i]};
                }
              }else {
                for(let i = 0; i < 5; i++){
                  that.lessRoute[i] = {title:result[0].route_title[i],content:result[0].route_content[i]};
                }
                for(let a=0,i = 5; i < result[0].route_title.length; a++,i++){
                  that.MoreRoute[a] = {title:result[0].route_title[i],content:result[0].route_content[i]};
                }
              }
              that.noRoute = true;
            }
            // console.log(result);
            // console.log('===================strategy-child=====================');
            // console.log(that.MoreRoute);
            that.data = result[0];
            that.searText = that.key;
          } else {
            // console.log('error');
          }
        });
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0,0);

    $(window).scroll(function () {
      if ($(window).scrollTop() > 475) {
        // console.log($(window).scrollTop());
        $('.about').addClass('about_fix');
      } else {
        $('.about').removeClass('about_fix');
      }
    });
    /*返回顶部*/
    $(window).scroll(function () {
      let height = $(window).scrollTop();
      // console.log(height);
      if (height > 475) {
        $('#to_top').show();
      } else if (height <= 475) {
        $('#to_top').hide();
      }
    });
    $('#to_top').click(function () {
      let height = $(window).scrollTop();
      let inter = setInterval(function () {
        if (height > 0) {
          height -= 20;
        } else {
          clearInterval(inter);
        }
        $(window).scrollTop(height);
      }, 10);
    });
  }


  moreToggle(){
    this._more = !this._more;
    if(this.more=='展开全部几天行程'){
      this.more='收起';
      this.up = 'up';
    }else {
      this.more='展开全部几天行程';
      this.up = 'down';
    }
  }

}
