import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexScenic'
})
export class IndexScenicPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args){
      var new_scenic=value.filter(function (theme,index) {
        if(theme){
          return theme;
        }
      });
      return new_scenic;
    }else{
      return value;
    }
  }

}
