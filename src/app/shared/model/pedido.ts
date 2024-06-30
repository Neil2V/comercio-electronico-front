import { Cliente } from "./cliente";
import { Producto } from "./producto";
import { ProductoPedido } from "./productoPedido";

export interface Pedido {
    id: number;
    cliente: Cliente;
    estado: string;
    productos: ProductoPedido[];
    total: number;
    fchRegistro?: Date;
}