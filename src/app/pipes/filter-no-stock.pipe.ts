import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterNoStock',
    standalone: false
})
export class FilterNoStockPipe implements PipeTransform {

  transform(products: any[], ...args: unknown[]): any[] {
    if (!products) {
      return [];
    }
    // Filtrar productos con cantidad igual a 0 product.stock === 0
    return products.filter(product => product.stock ==0);
  }

}
