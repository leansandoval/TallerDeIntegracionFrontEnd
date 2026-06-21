import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterStock',
    standalone: false
})
export class FilterStockPipe implements PipeTransform {

  transform(products: any[], ...args: unknown[]): any[] {
    if (!products) {
      return [];
    }
    // Filtrar productos con cantidad igual a 0
    return products.filter(product => product.stock>0);
  }
}
