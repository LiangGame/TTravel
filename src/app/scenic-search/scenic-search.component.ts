import {Component, OnInit,Input} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
// 导入服务
import {ScenicService} from './../services/scenic.service';

@Component({
  selector: 'app-scenic-search',
  templateUrl: './scenic-search.component.html',
  styleUrls: ['./scenic-search.component.css'],
  providers: [ScenicService],

})
export class ScenicSearchComponent implements OnInit {
  // result: Array<Object>;
  private data:any;
  private key:any;
  private cityName:any;
  @Input() searText:string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private scenicSer: ScenicService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.key = (<Params>this.route.queryParams).value['key'];
      if (this.key) {
        let that = this;
        that.scenicSer.get_scenic(function (result) {
          if (result) {
            that.data=result;
            for(let i = 0; i < result.length; i++){
              result[i].url = (result[i].url).split(',');
              console.log(result[i].url);
            }
            that.searText = that.key;
          } else {
            console.log('error');
          }
        });
      }
    })
  }

  details(deta){
    console.log(deta);

    if(deta){
      this.router.navigate(['/scenic-result'],{queryParams:{'key':deta}});
    }
  }

}
