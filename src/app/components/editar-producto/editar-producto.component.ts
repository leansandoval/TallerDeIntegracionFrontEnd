import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
    selector: 'app-editar-producto',
    templateUrl: './editar-producto.component.html',
    styleUrls: ['./editar-producto.component.css'],
    standalone: false
})

export class EditarProductoComponent implements OnInit {

	errorMessage: string | null = null;
	successMessage: string | null = null;
	Codigo: string = '';
	Descripcion: string = '';
	Stock: number = 0;
	Precio: number = 1;
	Activo: boolean = true;

	constructor(private activatedRoute: ActivatedRoute, private productosService: ProductoService, private router: Router) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			const productoId = params['id'];

			this.productosService.obtener_producto_by_codigo(productoId).subscribe(
				data => {
					this.Codigo = data.codigo;
					this.Descripcion = data.descripcion;
					this.Stock = data.stock;
					this.Precio = data.precio;
					this.Activo = data.activo
					// Manejar la respuesta exitosa aquí
					// this.successMessage = 'Producto modificado exitosamente';
					console.log(data.stock);
				},
				error => {
					// Manejar el error aquí
					console.error(error);
					this.errorMessage = error;  // Asigna el mensaje de error recibido del servicio

				}
			);
		});
	}

	ir_a_listado(): void {
		this.router.navigate(['/Listar_productos']);
	}

	Guarda(form: NgForm): void {
		if (form.invalid) {
			console.log('Formulario inválido');
			this.errorMessage = 'Formulario inválido';
			return;
		}

		this.errorMessage = null;  // Resetea el mensaje de error antes de realizar la petición
		this.successMessage = null;

		const nuevoProducto = {
			codigo: this.Codigo,
			descripcion: this.Descripcion,
			stock: this.Stock,
			precio: this.Precio,
			activo: this.Activo
		};

		console.log("🚀 ~ ProductosComponent ~ Guarda ~ Codigo:", this.Codigo, this.Precio, this.Descripcion);

		this.productosService.actualizarProducto(nuevoProducto).subscribe(
			data => {
				// Manejar la respuesta exitosa aquí
				this.successMessage = 'Producto editado exitosamente';
				console.log(data);
			},
			error => {
				// Manejar el error aquí
				console.error(error);
				this.errorMessage = error;  // Asigna el mensaje de error recibido del servicio

			}
		);
	}
}
