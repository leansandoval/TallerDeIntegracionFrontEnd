import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models';

@Component({
    selector: 'app-listar-productos',
    templateUrl: './listar-productos.component.html',
    styleUrls: ['./listar-productos.component.css'],
    standalone: false
})

export class ListarProductosComponent implements OnInit {
  responseData: any;
  searchText: string = '';
  id_seleccionado: string = "";

  constructor(private productosService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.productosService.listar_productos().subscribe(data => {
      this.responseData = data;
      console.log("🚀 ~ ListarProductosComponent ~ this.productosService.listar_productos ~ responseData:", this.responseData)
    });
  }

  selectProduct(id: string) {
    if (this.id_seleccionado === id) {
      this.id_seleccionado = "";
    } else {
      this.id_seleccionado = id;
    }
  }

  isSelected(id: string) {
    return this.id_seleccionado === id;
  }

  agregarProducto(): void {
    this.router.navigate(['/Registrar_Productos']);
  }

  modificarProducto(): void {

    this.router.navigate(['/Editarproducto/', this.id_seleccionado]);
  };

  eliminarProducto(): void {
    console.log(this.id_seleccionado);
    let estado = false;
    this.responseData.map((producto: Producto) => {

      if (producto.codigo === this.id_seleccionado) {
        estado = producto.activo;
      }
    });

    this.productosService.desactivaProducto(this.id_seleccionado).subscribe(data => {
      this.responseData = this.responseData.map((producto: Producto) => {
        if (producto.codigo === this.id_seleccionado) {
          return { ...producto, activo: estado ? 0 : 1 }; // Crear un nuevo objeto con la modificación
        } else {
          return producto; // Devolver el producto original sin cambios
        }
      });
    });

  }

  exportarListaProductos(): void {
    const fileContent = this.productosService.tabla_productos_a_string(this.responseData, "Código,Descripción,Stock,Activo,Precio\n");
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista-productos.txt';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

  };
  
  exportarListaProductosXLS(): void {
    this.productosService.exportar_a_xlsx(this.responseData, 'lista-productos', 'Productos');
  };

}
