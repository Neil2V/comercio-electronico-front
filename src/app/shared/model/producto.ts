export interface Producto {
    idProducto: number;
    nombre?: string;
    precio?: number;
    descipcion?: string;
    categoria?: string;
    stock?: number;
    imagen?: string;
    fchRegistro?: Date;
}