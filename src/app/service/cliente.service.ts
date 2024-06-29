import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../shared/model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [
    { idCliente: 1, nombre: 'Juan', apellido: 'Pérez' },
    { idCliente: 2, nombre: 'Ana', apellido: 'García' },
    { idCliente: 3, nombre: 'Luis', apellido: 'Martínez' },
    { idCliente: 4, nombre: 'Maria', apellido: 'Rodríguez' } 
  ];

  constructor() { }

  findClientes(): Observable<Cliente[]> {
    return of(this.clientes);
  }
}
