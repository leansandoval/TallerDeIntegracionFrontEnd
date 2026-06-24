import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
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
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger?: MatAutocompleteTrigger;

  productControl = new FormControl<string | Producto>('');
  filteredOptions: Observable<Producto[]> | undefined;
  allProducts: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.filteredOptions = this.productControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.getFilterText(value)))
    );

    this.productoService.listar_productos().subscribe((products: Producto[]) => {
      this.allProducts = products.filter(prod => prod.activo === true);
      this.productControl.updateValueAndValidity({ emitEvent: true });
    });
  }

  displayProduct(product: Producto): string {
    return product ? `${product.codigo} - ${product.descripcion}` : '';
  }

  private getFilterText(value: string | Producto | null): string {
    if (!value) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    return `${value.codigo} ${value.descripcion}`;
  }

  private _filter(value: string): Producto[] {
    const filterValue = value.toLowerCase();

    return this.allProducts.filter(product =>
      product.codigo.toLowerCase().includes(filterValue) ||
      product.descripcion.toLowerCase().includes(filterValue)
    );
  }

  onProductSelected(event: any) {
    const selectedProduct = event.option.value as Producto;
    if (selectedProduct) {
      this.productSelected.emit(selectedProduct);
      this.clear();
    }
  }

  clear(): void {
    this.productControl.setValue('');
  }

  showOptions(): void {
    if (typeof this.productControl.value !== 'string') {
      this.clear();
    }

    this.productControl.updateValueAndValidity({ emitEvent: true });
    setTimeout(() => this.autocompleteTrigger?.openPanel());
  }
  
}
