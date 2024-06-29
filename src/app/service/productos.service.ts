import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../shared/model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [
    {
      idProducto: 1,
      nombre: 'Coca Cola',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 10.5,
      categoria: 'Bebida',
      stock: 50,
      imagen: 'cocacola.jpeg',
      fchRegistro: new Date('2024-06-30')
    },
    {
      idProducto: 2,
      nombre: 'Coca Cola',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 25.75,
      categoria: 'Bebida',
      stock: 100,
      imagen: 'cocacola.jpeg',
      fchRegistro: new Date('2024-06-29')
    },
    {
      idProducto: 3,
      nombre: 'Coca Cola',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 5.99,
      categoria: 'Bebida',
      stock: 30,
      imagen: 'cocacola.jpeg',
      fchRegistro: new Date('2024-06-28')
    },
    {
      idProducto: 4,
      nombre: 'Coca Cola',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 15.0,
      categoria: 'Bebida',
      stock: 20,
      imagen: 'cocacola.jpeg',
      fchRegistro: new Date('2024-06-27')
    },
    {
      idProducto: 5,
      nombre: 'Coca Cola',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 8.49,
      categoria: 'Bebida',
      stock: 75,
      imagen: 'cocacola.jpeg',
      fchRegistro: new Date('2024-06-26')
    }
  ];

  constructor() { }

  findProductos(): Observable<Producto[]> {
    return of(this.productos);
  }
}
