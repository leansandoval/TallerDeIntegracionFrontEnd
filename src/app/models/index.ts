export interface Producto {
    codigo: string;
    descripcion: string;
    stock: number;
    activo: boolean;
    precio: number;
  }
  
  export interface LineaDeVenta {
    id: number; // Añadimos el campo id
    producto: Producto;
    cantidad: number;
    subtotal: number;
    precioUnitario: number;
  }
  
  export interface Venta {
    id: number;
    fecha: Date;
    cliente: string;
    productos: LineaDeVenta[];
    total: number;
    rechazada: boolean;
  }

  export interface CrearLineaVentaRequest {
    codigoProducto: string;
    cantidad: number;
  }

  export interface CrearVentaRequest {
    fecha: string;
    cliente: string;
    productos: CrearLineaVentaRequest[];
  }
  
