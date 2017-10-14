import {Injectable} from '@angular/core';

@Injectable()
export class GlobalPropertyService {
  // serverUrl: string = 'http://127.0.0.1:8889';
  // serverUrl: string = 'http://10.40.4.17:8889';
  serverUrl: string = 'http://59.110.218.93:8889';
  qiniuUrl: string = 'http://owpv96eru.bkt.clouddn.com';
  activeUrl='';
  constructor() {
  }
}
