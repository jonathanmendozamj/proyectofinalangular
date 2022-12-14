import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentName'
})
export class StudentPipe implements PipeTransform {
  transform(value: any): string {
    return `${ (value.surname?.toUpperCase() || 'NO DISPONIBLE') }, ${ (value.name || 'NO DISPONIBLE') }`;
  }
}