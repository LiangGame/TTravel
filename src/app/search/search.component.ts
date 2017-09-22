import { Component, OnInit } from '@angular/core';

declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#travel_search').focus(function () {
      $('#search_key').show();
    });
    $('#travel_search').blur(function () {
      $('#search_key').hide();
    });
  }

}
