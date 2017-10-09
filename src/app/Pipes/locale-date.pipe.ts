import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate'
})
export class LocaleDatePipe implements PipeTransform {

  transform(time: any, args?: any): any {
    var newTime;
    if(args == 'datetime' || args == ''){
      if(time){
        newTime = new Date(time);
        // console.log('当前时间:'+result[0].pubtime.toLocaleDateString()+' '+result[0].pubtime.toTimeString().substring(0,8));
        newTime = newTime.toLocaleDateString() + ' ' + newTime.toTimeString().substring(0, 8);
        return newTime;
      }else {
        return time;
      }
    }else if(args == 'date'){
      if(time){
        newTime = new Date(time);
        // console.log('当前时间:'+result[0].pubtime.toLocaleDateString()+' '+result[0].pubtime.toTimeString().substring(0,8));
        newTime = newTime.toLocaleDateString();
        return newTime;
      }else {
        return time;
      }
    }

  }
}
