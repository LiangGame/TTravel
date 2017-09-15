import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 _password: string;
 _rpassword: string;
  constructor() { }

  ngOnInit() {
  }
  ispass() {
    if (this._password === this._rpassword) {
      return false;
    }
    return true;
  }
}
