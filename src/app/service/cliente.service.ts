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


  private clientes: Cliente[] = [
    { idCliente: 1, nombre: 'Juan', apellido: 'Pérez', dni: '45678945', telefono: '987654321', fchRegistro: new Date('2024-06-27') },
    { idCliente: 2, nombre: 'Ana', apellido: 'García', dni: '45678945', telefono: '987654321', fchRegistro: new Date('2024-06-27') },
    { idCliente: 3, nombre: 'Luis', apellido: 'Martínez', dni: '45678945', telefono: '987654321', fchRegistro: new Date('2024-06-27') },
    { idCliente: 4, nombre: 'Maria', apellido: 'Rodríguez', dni: '45678945', telefono: '987654321', fchRegistro: new Date('2024-06-27') }
  ];

  constructor(protected _http: HttpClient) { }

  findAllClientes(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(`${this._url}/listadoClientes`);
  }

  registrarCliente(cliente: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(`${this._url}/registrar`, cliente);
  }
}
