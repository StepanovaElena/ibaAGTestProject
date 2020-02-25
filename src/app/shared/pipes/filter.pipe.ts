import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arg, search: string = '', field) {
    if (!search.trim()) {
      return arg;
    }
    return arg.filter(item => {
      return item[field].toLowerCase().includes(search.toLowerCase());
    });
  }

}
