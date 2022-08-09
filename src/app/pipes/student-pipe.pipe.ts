import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentPipe'
})
export class StudentPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
