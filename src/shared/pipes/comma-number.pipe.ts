import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaNumber'
})
export class CommaNumberPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    value = Math.round(value * 100)/ 100;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // private numberWithCustomPositionSeparator(value: number): string {
  //   let stringValue = value.toString();
  //   let result = '';
  //   for (let i = 0; i < stringValue.length; i++) {
  //     result += stringValue[i];
  //     if ((stringValue.length - 1 - i) % 3 === 0 && i !== stringValue.length - 1) {
  //       result += ',';
  //     }
  //   }
  //   return result;
  // }
}