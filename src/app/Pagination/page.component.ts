import {Component, Input} from "@angular/core";
@Component({
  selector: "my-page",
  templateUrl: "./page.component.html"
})
export class PageComponent {
  // 使用@Input接受传递过来的变量,操作。
  @Input()
  info: Array<Object>;
}
