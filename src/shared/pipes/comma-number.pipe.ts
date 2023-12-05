import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'n'
})
export class CommaNumberPipe implements PipeTransform {

  transform(value: number, position: number, separator: string = ',', ...args: any[]): string {
    if (value || value === 0) {
      return this.numberWithCustomPositionSeparator(value, position, separator);
    } else {
      return '';
    }
  }

  private numberWithCustomPositionSeparator(value: number, position: number, separator: string): string {
    let stringValue = value.toString();
    let result = '';
    for (let i = 0; i < stringValue.length; i++) {
      result += stringValue[i];
      if ((stringValue.length - 1 - i) % position === 0 && i !== stringValue.length - 1) {
        result += separator;
      }
    }
    return result;
  }
}