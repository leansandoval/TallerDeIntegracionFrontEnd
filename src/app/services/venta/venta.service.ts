import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LineaDeVenta, Producto, Venta } from 'src/app/models';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VentaService {

  apiUrl = environment.apiUrl;
  private productos: Producto[] = [];
  private ventas: Venta[] = [];

  constructor(private http: HttpClient) { }

  registrarVenta(venta: Venta): Observable<Venta> {
    venta.id = this.generateId();
    venta.fecha = new Date();
    this.crear_objetoVenta(venta);
    this.actualizarStockProductosVenta(venta);
    return of(venta);
  }

  private actualizarStock(venta: Venta): void {
    venta.productos.forEach(item => {
      const producto = this.productos.find(p => p.codigo === item.producto.codigo);
      if (producto) {
        producto.stock -= item.cantidad;
      }
    });
  }

  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.status === 404) {
      errorMessage = 'La ruta no se encuentra.';
    }
    else if (error.status === 0) {
      errorMessage = 'El servidor no está disponible.';
    }
    else if (error.status === 409) {
      errorMessage = 'El Venta(Codigo) ya existe.';
    }
    else {
      errorMessage = 'Ocurrió un error inesperado.';
    }
    return throwError(errorMessage);
  }

  crear_objetoVenta(venta: Venta) {
    return this.http.post<any>(`${this.apiUrl}/ventas`, venta).pipe(
      catchError(this.handleError)
    );
  }

  actualizarStockProductosVenta(venta: Venta): void {
    venta.productos.forEach(item => {
      const producto = item.producto;
      producto.stock -= item.cantidad;
      this.actualizarStockOProducto(producto).subscribe({
        next: (updatedProduct: any) => console.log('Producto actualizado:', updatedProduct),
        error: (error: any) => console.error('Error al actualizar el producto:', error)
      });
    });
  }

  actualizarStockOProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/productos/actualizarStock`, producto);
  }

  crearLineaDeVenta(lineaDeVenta: LineaDeVenta, ventaId: number): Observable<LineaDeVenta> {
    return this.http.post<LineaDeVenta>(`${this.apiUrl}/lineasdeventa/${ventaId}`, lineaDeVenta);
  }

  getVentasByDateRange(startDate: string, endDate: string): Observable<Venta[]> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<Venta[]>(`${this.apiUrl}/ventas/reportes`, { params });
  }

  listarLineas_venta(): Observable<LineaDeVenta[]> {
    return this.http.get<LineaDeVenta[]>(`${this.apiUrl}/lineasdeventa`);
  }

  getLineaVentaPorIdVenta(ventaId: any): Observable<LineaDeVenta[]> {
    return this.http.get<LineaDeVenta[]>(`${this.apiUrl}/lineasdeventa/${ventaId}`);
  }

  getVentaPorIdVenta(ventaId: any): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/ventas/${ventaId}`);
  }
}
