import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pedido } from '../shared/model/pedido';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private _url = `${environment.HOST_COMERCIO_ELECTRONICO}/pedidos`;

  constructor(protected _http: HttpClient) { }

  findAllPedidos(): Observable<Pedido[]> {
    return this._http.get<Pedido[]>(`${this._url}/listadoPedidos`);
  }

  registrarPedido(pedido: Pedido): Observable<Pedido> {
    return this._http.post<Pedido>(`${this._url}/registrar`, pedido);
  }

  actualizarPedido(pedido: Pedido): Observable<Pedido> {
    return this._http.put<Pedido>(`${this._url}/actualizar`, pedido);
  }

  deletePedido(id: string): Observable<Pedido> {
    return this._http.delete<Pedido>(`${this._url}/delete/${id}`);
  }
}
