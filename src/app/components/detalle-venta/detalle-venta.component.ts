import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineaDeVenta, Venta } from 'src/app/models';
import { VentaService } from 'src/app/services/venta/venta.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-detalle-venta',
    templateUrl: './detalle-venta.component.html',
    styleUrls: ['./detalle-venta.component.css'],
    standalone: false
})

export class DetalleVentaComponent implements OnInit {
  venta: Venta = {} as Venta;
  Totales: number = 0;
  lineasVenta: LineaDeVenta[] = [];
  LineasVentaproductoSinDuplicados: LineaDeVenta[] = [];

  constructor(private activatedRoute: ActivatedRoute, private ventasService: VentaService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const ventaId = params['id'];

      this.ventasService.getVentaPorIdVenta(ventaId).subscribe(data => {
        this.venta = data;

        console.log(data)

      });
      this.ventasService.getLineaVentaPorIdVenta(ventaId)
        .subscribe(lineasVenta => {
          this.lineasVenta = lineasVenta;

          this.obtenerListadosUnficados();
          console.log(this.LineasVentaproductoSinDuplicados)

        });

    });
  }

  private obtenerListadosUnficados() {
    this.LineasVentaproductoSinDuplicados = this.lineasVenta.reduce((acumulador: LineaDeVenta[], valorActual: LineaDeVenta) => {
      this.Totales += valorActual.subtotal;
      const elementoYaExiste = acumulador.find(elemento => elemento.producto.codigo.toUpperCase() === valorActual.producto.codigo.toUpperCase());
      if (elementoYaExiste) {
        return acumulador.map((elemento) => {

          if (elemento.producto.codigo.toUpperCase() === valorActual.producto.codigo.toUpperCase()) {

            return {
              ...elemento,
              cantidad: elemento.cantidad + valorActual.cantidad,
              subtotal: elemento.subtotal + valorActual.subtotal
            };
          }
          return elemento;
        });
      } else {
        return [...acumulador, valorActual];
      }
    }, []);
  }

  exportarDatos(): void {
    const datosVenta = `Fecha: ${new Date(this.venta.fecha).toLocaleString()}\nCliente: ${this.venta.cliente}\n`;
    const encabezado = `Código\tDescripción\tUnidades Vendidas\tRecaudacion\n`;
    const datosProductos = this.LineasVentaproductoSinDuplicados.map(prod =>
      `${prod.producto.codigo}\t${prod.producto.descripcion}\t${prod.cantidad}\t${prod.subtotal}\n`
    ).join('');
    const totalRecaudado = `Total Recaudado: ${this.Totales}\n`;

    const contenido = datosVenta + encabezado + datosProductos + totalRecaudado;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'detalle_venta.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportarDatosXLSX(): void {
    const worksheetData = [
      ['Fecha', new Date(this.venta.fecha).toLocaleString()],
      ['Cliente', this.venta.cliente],
      ['Total Recaudado', this.Totales],
      [],
      ['Código', 'Descripción', 'Unidades Vendidas', 'Recaudacion'],
      ...this.LineasVentaproductoSinDuplicados.map(prod => [
        prod.producto.codigo, prod.producto.descripcion, prod.cantidad, prod.subtotal
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Detalle Venta');

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'detalle_venta.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
}
