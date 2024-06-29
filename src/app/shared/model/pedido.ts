import { Cliente } from "./cliente";
import { Producto } from "./producto";

export interface Pedido {
    idPedido: number;
    cliente: Cliente;
    productos: Producto[];
    total: number;
}