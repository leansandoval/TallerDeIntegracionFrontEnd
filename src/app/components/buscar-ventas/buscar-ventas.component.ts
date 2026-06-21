import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Venta } from 'src/app/models';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
    selector: 'app-buscar-ventas',
    templateUrl: './buscar-ventas.component.html',
    styleUrls: ['./buscar-ventas.component.css'],
    standalone: false
})

export class BuscarVentasComponent implements OnInit {
  ventas: Venta[] = [];
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService, private router: Router
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    this.filterForm = this.fb.group({
      startDate: [this.formatDate(lastMonth)],
      endDate: [this.formatDate(today)]
    });
  }

  onSubmit() {
    const { startDate, endDate } = this.filterForm.value;
    this.ventaService.getVentasByDateRange(startDate, endDate).subscribe(ventas => {
      this.ventas = ventas;
    });
  }

  verDetalle(venta: Venta) {
    // Implementar lógica para ver detalle de la venta
    console.log(venta);
    this.router.navigate(['/Detalle_Venta/', venta.id]);
  }

  exportarVentasActuales(): void {

  }
  exportarTodasVentas(): void {

  };

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

}
