import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classroom',
})
export class ClassroomPipe implements PipeTransform {
  transform(value: string): string {
    const title = value[0].toUpperCase() + value.slice(1).toLowerCase();
    return `Classroom: ${title}`;
  }
}
