import { Cliente } from "./cliente";
import { Producto } from "./producto";

export interface Pedido {
    idPedido: number;
    nroPedido: string;
    cliente: Cliente;
    estado: string;
    productos: Producto[];
    total: number;
    fchRegistro?: Date;
}