import { Cliente } from "./cliente";
import { ProductoPedido } from "./productoPedido";

export interface Pedido {
    id?: string;
    cliente?: Cliente;
    estado?: string;
    productos?: ProductoPedido[];
    total?: number;
    fchRegistro?: Date;
}