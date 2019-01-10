import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text2html'
})
export class Text2htmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
