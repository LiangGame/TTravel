import {Injectable} from '@angular/core';

@Injectable()
export class GlobalPropertyService {
  serverUrl: string = 'http://127.0.0.1:8889';
  // serverUrl: string = 'http://10.40.4.21:8889';
  activeUrl='';
  constructor() {
  }
}
