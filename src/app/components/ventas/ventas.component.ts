import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineaDeVenta } from 'src/app/models';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
    selector: 'app-ventas',
    templateUrl: './ventas.component.html',
    styleUrls: ['./ventas.component.css'],
    standalone: false
})

export class VentasComponent implements OnInit {

  responseData: any;
  responseventaData: any;
  LineasVentaproducto: LineaDeVenta[] = [];
  Exportacion: any[] = [{
    Codigo: "",
    Descripción: "",
    Unidades: 0,
    Recaudacion: 0,
  }];
  Totales: number = 0;
  LineasVentaproductoSinDuplicados: LineaDeVenta[] = [];

  constructor(private productosService: ProductoService, private ventaService: VentaService, private router: Router) { }
  
  ngOnInit(): void {
    this.ventaService.listarLineas_venta().subscribe(data => {
      this.LineasVentaproducto = data;
      this.LineasVentaproductoSinDuplicados = this.LineasVentaproducto.reduce((acumulador: LineaDeVenta[], valorActual: LineaDeVenta) => {
        this.Totales += valorActual.subtotal;
        const elementoYaExiste = acumulador.find(elemento => elemento.producto.codigo.toUpperCase() === valorActual.producto.codigo.toUpperCase());
        if (elementoYaExiste) {
          return acumulador.map((elemento) => {

            if (elemento.producto.codigo.toUpperCase() === valorActual.producto.codigo.toUpperCase()) {

              return {
                ...elemento,
                cantidad: elemento.cantidad + valorActual.cantidad,
                subtotal: elemento.subtotal + valorActual.subtotal
              }
            }
            return elemento;
          });
        } else {
          return [...acumulador, valorActual];
        }
      }, []);
      console.log(this.LineasVentaproductoSinDuplicados)

      console.log("🚀 ~ ListarProductosComponent ~ this.productosService.listar_productos ~ responseData:", this.responseData)
    });
  }

  exportarListaProductos(): void {
    this.Exportacion = this.LineasVentaproductoSinDuplicados.map(linea => ({
      Codigo: linea.producto.codigo,
      Descripción: linea.producto.descripcion,
      Unidades: linea.cantidad,
      Recaudacion: linea.subtotal
    }));

    const fileContent = this.productosService.tabla_productos_a_string(this.Exportacion, "Código,Descripción,Unidades,Recaudación\n");
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Recaudaciones-de-productos.txt';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  exportarListaProductosXLS(): void {
    this.Exportacion = this.LineasVentaproductoSinDuplicados.map(linea => ({
      Codigo: linea.producto.codigo,
      Descripción: linea.producto.descripcion,
      Unidades: linea.cantidad,
      Recaudacion: linea.subtotal
    }));
    this.productosService.exportar_a_xlsx(this.Exportacion, 'Recaudaciones-de-productos', 'Productos');
  };

  agregarProducto(): void {
    this.router.navigate(['/Registrar_Productos']);
  }

  modificarProducto(): void {
  };

  eliminarProducto(): void {
  }

}
