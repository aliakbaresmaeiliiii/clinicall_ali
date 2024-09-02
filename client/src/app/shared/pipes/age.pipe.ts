import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(value: Date | string | null, ...args: unknown[]): number| null| any {
    if (value === null || value === undefined) return null;
    let birthDate: Date;
    if (typeof value === 'string') {
      birthDate = new Date(value);
    } else {
      birthDate = new Date(value);
    }
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
