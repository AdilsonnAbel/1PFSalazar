import { Pipe, PipeTransform } from '@angular/core';
import { typeNames } from '../interfaces/student';
import { titleCase } from '../utils/functions';

@Pipe({
  name: 'names',
})
export class NamesPipe implements PipeTransform {
  transform(value: typeNames): string {
    const { firstNames, lastNames } = value;
    const tx1 = lastNames.join(' ').toUpperCase();
    const tx2 = firstNames.map(titleCase).join(' ');

    return `${tx1}, ${tx2}`;
  }
}
