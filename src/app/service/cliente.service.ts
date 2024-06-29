import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../shared/model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [
    { idCliente: 1, nombre: 'Juan', apellido: 'Pérez', dni: '45678945', telefono: '987654321' },
    { idCliente: 2, nombre: 'Ana', apellido: 'García', dni: '45678945', telefono: '987654321' },
    { idCliente: 3, nombre: 'Luis', apellido: 'Martínez', dni: '45678945', telefono: '987654321' },
    { idCliente: 4, nombre: 'Maria', apellido: 'Rodríguez', dni: '45678945', telefono: '987654321' } 
  ];

  constructor() { }

  findClientes(): Observable<Cliente[]> {
    return of(this.clientes);
  }
}
