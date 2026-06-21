import { Component, NgModule } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css'],
    standalone: false
})

export class ProductosComponent {

	errorMessage: string | null = null;
	successMessage: string | null = null;
	Codigo: string = '';
	Descripcion: string = '';
	Stock: number = 0;
	Precio: number = 1;
	Activo: boolean = true;

	constructor(private productosService: ProductoService, private router: Router) { }

	ir_a_listado(): void {
		this.router.navigate(['/Listar_productos']);
	}

	Guarda(form: NgForm): void {
		if (form.invalid) {
			console.log('Formulario inválido');
			this.errorMessage = 'Formulario inválido';
			return;
		}

		this.errorMessage = null;
		this.successMessage = null;

		const nuevoProducto = {
			codigo: this.Codigo,
			descripcion: this.Descripcion,
			stock: this.Stock,
			precio: this.Precio,
			activo: this.Activo
		};

		console.log("🚀 ~ ProductosComponent ~ Guarda ~ Codigo:", this.Codigo, this.Precio, this.Descripcion);

		this.productosService.crear_objetoProducto(nuevoProducto).subscribe(
			data => {
				// Manejar la respuesta exitosa aquí
				this.successMessage = 'Producto creado exitosamente';
				console.log(data);
			},
			error => {
				// Manejar el error aquí
				console.error(error);
				this.errorMessage = error;
			}
		);
	}
}
