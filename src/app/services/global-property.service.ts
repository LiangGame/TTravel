import { Injectable } from '@angular/core';

@Injectable()
export class GlobalPropertyService {
  private serverUrl:string;
  constructor() {
    this.serverUrl='http://127.0.0.1:8889';
  }
  getUrl(){
    return this.serverUrl
  }
}
