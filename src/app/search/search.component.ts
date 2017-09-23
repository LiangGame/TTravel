import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    $('#travel_search').focus(function () {
      $('#search_key').show();
    });
    $('#travel_search').blur(function () {
      $('#search_key').hide();
    });
  }

  btnSearch(text){
    // text={"cityName":text};
    // console.log(text);
    // let that = this;
    if(text){
      console.log(text);
      // that.router.navigate(['/scenic_search'],{queryParams:{'key':text}});
      this.router.navigate(['/scenic_search'],{queryParams:{'key':text}});
    }
  }
}
