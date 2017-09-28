import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../../services/auth-guard.service";

@Component({
  selector: 'app-want-to-go',
  templateUrl: './want-to-go.component.html',
  styleUrls: ['./want-to-go.component.css'],
  providers:[AuthGuard]
})
export class WantToGoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
