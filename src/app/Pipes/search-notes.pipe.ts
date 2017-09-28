import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchNotes'
})
export class SearchNotesPipe implements PipeTransform {

  transform(notes: any, args?: any): any {
    console.log(notes);
    // console.log(args);
    console.log('<<<<<<<<<<>>>>>>>>>>>>>>>');
    var arg = args || '';
    if(arg){
      var new_notes = notes.filter(function (notes,index) {
        if(notes.title.indexOf(arg)!=-1
          ||notes.content.indexOf(arg)!=-1){
          return notes;
        }
      })
      return new_notes;
    }else{
      return notes;
    }
  }

}
