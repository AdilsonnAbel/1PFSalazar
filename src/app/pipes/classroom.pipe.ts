import { Pipe, PipeTransform } from '@angular/core';
import { titleCase } from '../utils/functions';

@Pipe({
  name: 'classroom',
})
export class ClassroomPipe implements PipeTransform {
  transform(value: string): string {
    return `Classroom: ${titleCase(value)}`;
  }
}
