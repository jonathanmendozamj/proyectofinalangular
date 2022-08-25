import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentName'
})
export class StudentPipe implements PipeTransform {
  transform(value: any): string {
    return `${ value.name } ${ (value.surname?.toUpperCase() ) }`;
  }
}