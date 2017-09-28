import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 导入服务
import {IndexService} from './../services/index.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [IndexService]
})
export class IndexComponent implements OnInit {
  _scenic: any;
  _notes: any;
  newscenic: string;
  newNotes: string;

  constructor(private indexSer: IndexService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getScenic();
    this.getNotes();
  }

  getScenic() {
    let that = this;
    that.indexSer.show_scenic(function (result) {
      console.log('成功')
      if (result) {
        for(let i = 0; i < result.length; i++){
          if(result[i].url == '' || result[i].url == null){
            continue;
          }else{
            result[i].url = (result[i].url).split(',');
          }
          // console.log(result[i].url);
        }
        that._scenic = result;
        // that.newscenic=result[0];
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


}
