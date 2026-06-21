import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Producto } from 'src/app/models';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css'],
    standalone: false
})

export class AutocompleteComponent implements OnInit {

  @Output() productSelected = new EventEmitter<Producto>();
  productControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  allProducts: Producto[] = [];
  cache: { [key: string]: string[] } = {};

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.productControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    ).subscribe(filteredOptions => {
      this.filteredOptions = of(filteredOptions);
    });

    this.productoService.listar_productos().subscribe((products: Producto[]) => {
      this.allProducts = products.filter(prod => prod.activo == true);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (this.cache[filterValue]) {
      return this.cache[filterValue];
    }

    const filtered = this.allProducts.map(product => product.descripcion).filter(option => option.toLowerCase().includes(filterValue));

    this.cache[filterValue] = filtered;

    return filtered;
  }

  onProductSelected(event: any) {
    const selectedProduct = this.allProducts.find(product => product.descripcion === event.option.value && product.activo === true);
    if (selectedProduct) {
      this.productSelected.emit(selectedProduct);
    }
  }
  
}
