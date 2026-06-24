import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BuscarVentasComponent } from './components/buscar-ventas/buscar-ventas.component';
import { CommonModule } from '@angular/common';
import { DetalleVentaComponent } from './components/detalle-venta/detalle-venta.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { FilterNoStockPipe } from './pipes/filter-no-stock.pipe';
import { FilterStockPipe } from './pipes/filter-stock.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { LoginComponent } from './components/login/login.component';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { ProductosComponent } from './components/productos/productos.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarVentasComponent } from './components/registrar-ventas/registrar-ventas.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { VentasComponent } from './components/ventas/ventas.component';

@NgModule({
    declarations: [
        AppComponent,
        AutocompleteComponent,
        BuscarVentasComponent,
        DetalleVentaComponent,
        EditarProductoComponent,
        FilterNoStockPipe,
        FilterStockPipe,
        HomeComponent,
        ListarProductosComponent,
        LoginComponent,
        NavBarComponent,
        NotificacionComponent,
        ProductosComponent,
        RegistrarVentasComponent,
        SearchPipe,
        VentasComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        ReactiveFormsModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
