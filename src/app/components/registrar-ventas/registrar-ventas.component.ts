import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { LineaDeVenta, Producto, Venta } from 'src/app/models';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-registrar-ventas',
  standalone: false,
  styleUrls: ['./registrar-ventas.component.css'],
  templateUrl: './registrar-ventas.component.html',
})

export class RegistrarVentasComponent implements OnInit {

  cantidadform: number = 1;
  cantidadProducto: number = 1;
  cliente: string = '';
  clienteform: string = '';
  codigoform: string = "";
  codigoProducto: string = "";
  errorMessage: string | null = null;
  indexform = 0;
  miFormulario: FormGroup;
  nombreProducto: string = "";
  producto: Producto = {} as Producto;
  successMessage: string | null = null;
  venta: Venta = { id: 0, fecha: new Date(), cliente: '', productos: [], total: 0, rechazada: false };

  onProductSelected(product: Producto) {
    this.errorMessage = null;
    this.successMessage = null;
    this.codigoProducto = product.codigo;
    this.nombreProducto = product.descripcion;
  }

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

  ngOnInit(): void { }

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
    this.errorMessage = null;
    this.successMessage = null;

    if (this.codigoProducto == null || this.codigoProducto == '') {
      this.errorMessage = 'Selecciona un producto del buscador antes de agregarlo.';
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
        this.venta.id = data.id;
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
    this.codigoProducto = '';
    this.cantidadProducto = 1;
    this.miFormulario.patchValue({
      cliente: '',
      Date: this.formatDate(new Date()),
      Time: this.formatTime(new Date()),
    });
    this.venta = { id: 0, fecha: new Date(), cliente: '', productos: [], total: 0, rechazada: false };
  }

  eliminarProducto(index: number) {
    this.venta.productos.splice(index, 1);
    this.calcularTotal();
  }

}
