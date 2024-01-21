import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rounding'
})
export class Rounding implements PipeTransform { 
  transform(value: any): number {
    if (value !== undefined && value !== null) {
      return Math.round(value*2)/2;
    } else {
      return 0;
    }
  }
}