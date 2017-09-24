import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexNotes'
})
export class IndexNotesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args){
      var new__notes=value.filter(function (topic,index) {
        if(topic){
          return topic;
        }
      });
      return new__notes;
    }else{
      return value;
    }
  }

}
