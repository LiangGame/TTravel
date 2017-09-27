import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {check} from "@angular/tsc-wrapped/src/tsc";

declare var $: any; // 在angular中调用jQ前的万能语句
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  _check: boolean = false;
  nav:string;
  _checked: string = '';
  checkNav: any = ['目的地', '游记', '攻略'];


  constructor(private router: Router) {
    $(function () {
      $('label').click(function () {
        var radioId = $(this).attr('name');
        $('label').removeAttr('class') && $(this).attr('class', 'checked');
        $('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
      });
    });
  }

  ngOnInit() {

    $('#travel_search').focus(function () {
      $('#search_key').show();
    });
    $('#travel_search').blur(function () {
      $('#search_key').hide();
    });
  }

  ngAfterViewInit(){
    // $('.nav0').attr('class', 'checked');
    // this._checked = "checked";
  }

  btnSearch(nav) {
    console.log(nav.value);
    let navItem = nav.value.nav;
    let searchText = nav.value.searchText;
    // console.log(!!searchText);
    if (navItem == 0 && !!searchText) {
      this.router.navigate(['/scenic_search'], {queryParams: {'key': searchText}});
    } else if (navItem == 1 && !!searchText) {
      this.router.navigate(['/travels'], {queryParams: {'key': searchText}});
    } else if (navItem == 2 && !!searchText) {
      this.router.navigate(['/strategy'], {queryParams: {'key': searchText}});
    }
  }
}
