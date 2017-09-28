import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  isLogin:string = sessionStorage.getItem('user');
  canActivate() {
    let that = this;
    console.log(this.isLogin);
    if(this.isLogin){
      return true;
    }else {
      that.router.navigate(['/index']);
      // console.log('AuthGuard#>>canActivate called');
      return false;
    }
  }
}
