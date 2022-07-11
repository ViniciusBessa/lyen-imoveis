import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormatter',
})
export class PriceFormatterPipe implements PipeTransform {
  transform(value: number): string {
    const price: string = value.toString();
    if (price.length > 2) {
      const priceDigits: string[] = price.split('');
      priceDigits[priceDigits.length - 2] = `,${
        priceDigits[priceDigits.length - 2]
      }`;

      for (let index: number = priceDigits.length - 5; index > 0; index -= 3) {
        priceDigits[index] = `.${priceDigits[index]}`;
      }
      return priceDigits.join('');
    }
    return `0.${price}`;
  }
}
