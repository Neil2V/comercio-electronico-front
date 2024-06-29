import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pedido } from '../shared/model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private pedidos: Pedido[] = [
    {
      idPedido: 1,
      nroPedido: 'nro-12345',
      cliente: { idCliente: 1, nombre: 'Juan', apellido: 'Pérez' },
      estado: 'Solicitado',
      productos: [
        { idProducto: 1, nombre: 'Producto 1', precio: 100, cantidad: 2, stock: 10 },
        { idProducto: 2, nombre: 'Producto 2', precio: 200, cantidad: 1, stock: 15 }
      ],
      total: 400
    },
    {
      idPedido: 2,
      nroPedido: 'nro-12346',
      estado: 'Solicitado',
      cliente: { idCliente: 2, nombre: 'Ana', apellido: 'García' },
      productos: [
        { idProducto: 3, nombre: 'Producto 3', precio: 150, cantidad: 1, stock: 11 }
      ],
      total: 150
    }
  ];

  constructor() { }

  findPedidos(): Observable<Pedido[]> {
    return of(this.pedidos);
  }
}
