import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../shared/model/cliente';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private _url = `${environment.HOST_COMERCIO_ELECTRONICO}/clientes`;

  constructor(protected _http: HttpClient) { }

  findAllClientes(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(`${this._url}/listadoClientes`);
  }

  registrarCliente(cliente: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(`${this._url}/registrar`, cliente);
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this._http.put<Cliente>(`${this._url}/actualizar`, cliente);
  }

  deleteCliente(idCliente: number): Observable<Cliente> {
    return this._http.delete<Cliente>(`${this._url}/delete/${idCliente}`);
  }

}
