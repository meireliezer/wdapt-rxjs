import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByKeys'
})
export class FilterByKeysPipe implements PipeTransform {

  // args[0] - filter text
  // args[1] - Arry of keys to compore to
  transform(value: any, ...args: any[]): any {

    let filterPattern = args[0];
    let keys = args[1];

    if( (filterPattern === '')  || 
        (filterPattern === undefined) || 
        (args.length === 0) ){
      return value;
    }

    let newList = value.filter( item => {
      let found = false;

      keys.forEach(key => {
        if(item[key].indexOf(filterPattern) !== -1){
          found = true;
        }
      });
      return found;
    });

    
    return newList;
  }

}
