import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchScenic'
})
export class SearchScenicPipe implements PipeTransform {

  transform(scenic: any, args?: any): any {
    if(args){
      var new_scenic = scenic.filter(function (scenic,index) {
        if(scenic.author.indexOf(args)!=-1||scenic.name.indexOf(args)!=-1){
          return scenic;
        }
      })
      return new_scenic;
    }else{
      return scenic;
    }
  }

}
