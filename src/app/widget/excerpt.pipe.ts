import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(value: string, length = 100): any {
    if (!value) {
      return value;
    }
    if (value.length > length) {
      return value.substr(0, length) + ' ...';
    }
    return value;
  }

}
