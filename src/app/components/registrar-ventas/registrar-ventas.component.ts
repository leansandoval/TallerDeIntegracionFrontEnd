import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta/venta.service';
import { Venta, LineaDeVenta, Producto } from 'src/app/models';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
    selector: 'app-registrar-ventas',
    templateUrl: './registrar-ventas.component.html',
    styleUrls: ['./registrar-ventas.component.css'],
    standalone: false
})

export class RegistrarVentasComponent implements OnInit {

  cliente: string = '';

  venta: Venta = { id: 0, fecha: new Date(), cliente: '', productos: [], total: 0, rechazada: false };

  producto: Producto = {} as Producto;

  errorMessage: string | null = null;

  miFormulario: FormGroup;

  successMessage: string | null = null;

  cantidadform: number = 1;
  codigoform: string = "";
  clienteform: string = '';
  codigoProducto: string = "";
  cantidadProducto: number = 1;
  nombreProducto: string = "";

  onProductSelected(product: Producto) {
    this.codigoProducto = product.codigo;
    this.nombreProducto = product.descripcion;
  }

  indexform = 0;
  
  constructor(private ventaService: VentaService, private productoService: ProductoService, private fb: FormBuilder) {
    const today = new Date();
    this.miFormulario = this.fb.group({
      cliente: [''],
      productos: this.fb.array([]),
      Date: [this.formatDate(today)],
      Time: this.formatTime(today),

      nombreProducto: [""],
    });
  }

  ngOnInit(): void {}

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatTime(date: Date): string {
    const currentHour = date.getHours().toString().padStart(2, '0');
    const currentMinute = date.getMinutes().toString().padStart(2, '0');
    const currentSecond = date.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${currentHour}:${currentMinute}:${currentSecond}`;
    return formattedTime;
  }

  updateDateTime() {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date();
    const currentHour = currentTime.getHours().toString().padStart(2, '0');
    const currentMinute = currentTime.getMinutes().toString().padStart(2, '0');
    const currentSecond = currentTime.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${currentHour}:${currentMinute}:${currentSecond}`;

    this.miFormulario.patchValue({
      Date: currentDate,
      Time: formattedTime
    });
  }

  agregarProducto() {
    if (this.codigoProducto == null || this.codigoProducto == '') {
      this.errorMessage = 'Formulario inválido-Codigo de producto no ingresado';
      return;
    }

    this.productoService.obtener_producto_by_codigo(this.codigoProducto).subscribe(
      producto => {
        if (producto) {
          if (this.cantidadProducto <= 0) {
            alert('La cantidad ingresada no es valida');
          }
          if (producto.activo == false) {
            alert('El producto no se encuentra activo.');
            return;
          }
          else {
            if (producto.stock > 0) {

              let productoEnLista: Producto = this.venta.productos.filter(x => x.producto.codigo == producto.codigo)
                .reduce((acc, curr) => {
                  acc.stock += curr.cantidad;
                  return acc;
                }, { ...producto, stock: 0 });
              // debugger
              if (productoEnLista && this.cantidadProducto > (producto.stock - productoEnLista.stock)) {
                this.cantidadProducto = producto.stock - productoEnLista.stock;
                if (this.cantidadProducto == 0) {
                  alert('Producto sin stock');
                  return;
                }
                alert('No hay stock suficiente para vender la cantidad solicitada, se modificó la cantidad automáticamente a ' + (producto.stock - productoEnLista.stock));
              }
              if (!productoEnLista && producto.stock < this.cantidadProducto) {
                this.cantidadProducto = producto.stock
                alert('No hay stock suficiente para vender la cantidad solicitada, se modifico la cantidad automaticamente a ' + producto.stock);
              }


              const subtotal = this.cantidadProducto * producto.precio;
              this.venta.productos.push({
                id: this.generateId(),
                producto: { codigo: producto.codigo, descripcion: producto.descripcion, stock: producto.stock, activo: producto.activo, precio: producto.precio },
                cantidad: this.cantidadProducto,
                subtotal: subtotal,
                precioUnitario: producto.precio,
              });
              this.venta.total += subtotal;
              this.codigoProducto = '';
              this.cantidadProducto = 1;
              this.nombreProducto = "";
            }
            else {
              alert('Producto sin stock');
            }
          }
        }

      },
      error => {
        alert('Producto no encontrado.');
      });

  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  calcularSubtotal(index: number): void {
    const item = this.venta?.productos[index];
    item.subtotal = item.cantidad * item.producto.precio;
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.venta.total = this.venta.productos.reduce((acc, item) => acc + item.subtotal, 0);
  }

  getDateTimeString(): string {
    const date = this.miFormulario.get('Date')?.value;
    const time = this.miFormulario.get('Time')?.value;
    return `${date}T${time}`;
  }

  onSubmit(): void {

    this.errorMessage = '';
    debugger
    this.venta.cliente = this.miFormulario.get('cliente')?.value;
    this.venta.fecha = new Date(this.getDateTimeString());
    this.cliente = this.venta.cliente;
    if (this.venta.cliente == null || this.venta.cliente == '') {
      this.errorMessage = 'Formulario inválido- Nombre de cliente obligatorio';
      return;
    }

    if (this.venta.productos == null || this.venta.productos.length == 0) {
      this.errorMessage = 'Formulario inválido- No se registran productos ingresados';
      console.log(this.errorMessage);
      return;
    }

    this.ventaService.crear_objetoVenta(this.venta).subscribe(
      data => {
        console.log("🚀 ~ RegistrarVentasComponent ~ onSubmit ~ data:", data);
        // alert('Venta registrada con éxito');
        this.venta.id = data.id;

        this.venta.productos.forEach(linea => {
          this.ventaService.crearLineaDeVenta(linea, this.venta.id).subscribe();
        });

        this.ventaService.actualizarStockProductosVenta(this.venta);
        this.resetForm();

        this.successMessage = "Venta registrada exitosamente"
      },
      error => {
        this.errorMessage = error
        alert('Error al registrar la venta');
      }
    );
  }

  private resetForm(): void {
    this.cliente = '';
    this.venta = { id: 0, fecha: new Date(), cliente: '', productos: [], total: 0, rechazada: false };
  }

  eliminarProducto(index: number) {
    this.venta.productos.splice(index, 1);
    this.calcularTotal();
  }

}
