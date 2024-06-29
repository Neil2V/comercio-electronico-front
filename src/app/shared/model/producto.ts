export interface Producto {
    idProducto: number;
    nombre?: string;
    precio?: number;
    descripcion?: string;
    categoria?: string;
    stock?: number;
    imagen?: string;
    fchRegistro?: Date;
}