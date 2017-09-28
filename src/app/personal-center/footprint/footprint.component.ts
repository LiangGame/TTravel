import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../../services/auth-guard.service";

@Component({
  selector: 'app-footprint',
  templateUrl: './footprint.component.html',
  styleUrls: ['./footprint.component.css'],
  providers:[AuthGuard]
})
export class FootprintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
