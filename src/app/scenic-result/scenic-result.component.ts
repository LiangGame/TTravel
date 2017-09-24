import { Component, OnInit } from '@angular/core';
import {ScenicService} from './../services/scenic.service';
import {ActivatedRoute, Router, Params} from '@angular/router';


@Component({
  selector: 'app-scenic-result',
  templateUrl: './scenic-result.component.html',
  styleUrls: ['./scenic-result.component.css'],
  providers: [ScenicService],
})
export class ScenicResultComponent implements OnInit {
  scenics:any;
  images: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private secninSer:ScenicService
    ) {
    this.get_scenic();
    // console.log(this.scenics);
    // console.log('<<<------->>>');
  }

  ngOnInit() {
  };

  get_scenic(){
    this.route.params.subscribe((params: Params) => {
      let id = (<Params>this.route.queryParams).value['key'];
      if (id) {
        let that = this;
        id = {"id":id};
        that.secninSer.getScenicItem(id,function (result) {
          // console.log(id);
          // console.log('>>>>>>>>>');
          if(result){
            that.scenics = result[0];
            that.images = result[0].url.split(',');
          }
        })
      }
    });
  }

}
1
