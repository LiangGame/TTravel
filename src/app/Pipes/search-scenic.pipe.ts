import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchScenic'
})
export class SearchScenicPipe implements PipeTransform {

  transform(scenic: any, args?: any): any {
    console.log(scenic);
    if(args){
      var new_scenic = scenic.filter(function (scenic,index) {
        if(scenic.title.indexOf(args)!=-1
          ||scenic.info.indexOf(args)!=-1
          ||scenic.cityname.indexOf(args)!=-1){
          return scenic;
        }
      })
      console.log('==================PIPES==================');
      return new_scenic;
    }else{
      return scenic;
    }
  }

}
