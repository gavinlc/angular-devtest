import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'm2h',
})
export class MinutesToHours implements PipeTransform {
  transform(input: number): string {
    // set minutes to seconds
    var seconds = input * 60;

    // calculate (and subtract) whole days
    var days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(seconds / 3600) % 24;
    seconds -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(seconds / 60) % 60;

    return days + 'd ' + hours + 'h ' + minutes + 'm ';
  }
}
