import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchStrategy'
})
export class SearchStrategyPipe implements PipeTransform {

  transform(strategy: any, args?: any): any {
    if (strategy && args) {
      var new_strategy = strategy.filter(function (scenic, index) {
        if (scenic.title.indexOf(args) != -1
          || scenic.info.indexOf(args) != -1
          || scenic.content.indexOf(args) != -1) {
          return strategy;
        }
      })
      // console.log('==================PIPES==================');
      return new_strategy;
    } else {
      return strategy;
    }
  }

}
