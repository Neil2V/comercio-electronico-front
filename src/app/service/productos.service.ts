import { Injectable } from '@angular/core';
import { Producto } from '../shared/producto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [
    {
      idProducto: 1,
      nombre: 'Producto 1',
      precio: 10.5,
      categoria: 'Electrónica',
      stock: 50,
      imagen: 'producto1.jpg',
      fchRegistro: new Date('2024-06-30')
    },
    {
      idProducto: 2,
      nombre: 'Producto 2',
      precio: 25.75,
      categoria: 'Ropa',
      stock: 100,
      imagen: 'producto2.jpg',
      fchRegistro: new Date('2024-06-29')
    },
    {
      idProducto: 3,
      nombre: 'Producto 3',
      precio: 5.99,
      categoria: 'Hogar',
      stock: 30,
      imagen: 'producto3.jpg',
      fchRegistro: new Date('2024-06-28')
    },
    {
      idProducto: 4,
      nombre: 'Producto 4',
      precio: 15.0,
      categoria: 'Electrónica',
      stock: 20,
      imagen: 'producto4.jpg',
      fchRegistro: new Date('2024-06-27')
    },
    {
      idProducto: 5,
      nombre: 'Producto 5',
      precio: 8.49,
      categoria: 'Juguetes',
      stock: 75,
      imagen: 'producto5.jpg',
      fchRegistro: new Date('2024-06-26')
    }
  ];

  constructor() { }

  findProductos(): Observable<Producto[]> {
    return of(this.productos);
  }
}
