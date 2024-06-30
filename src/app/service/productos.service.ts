import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../shared/model/producto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _url = `${environment.HOST_COMERCIO_ELECTRONICO}/productos`;



  productos: Producto[] = [
    {
      idProducto: 1,
      nombre: 'Coca Cola',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 10.5,
      categoria: 'Bebida',
      stock: 50,
    },
    {
      idProducto: 2,
      nombre: 'Inka Cola',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 25.75,
      categoria: 'Bebida',
      stock: 100,
    },
    {
      idProducto: 3,
      nombre: 'Pepsi',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 5.99,
      categoria: 'Bebida',
      stock: 30,
    },
    {
      idProducto: 4,
      nombre: 'Guarana',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 15.0,
      categoria: 'Bebida',
      stock: 20,
    },
    {
      idProducto: 5,
      nombre: 'Sprite',
      descripcion: 'Gaseosa Coca-cola Sin Azúcar de 500 mL',
      precio: 8.49,
      categoria: 'Bebida',
      stock: 75,
    }
  ];

  constructor(protected _http: HttpClient) { }

  findProductos(): Observable<Producto[]> {
    return this._http.get<Producto[]>(`${this._url}/listadoProductos`);
  }

  registrarProducto(producto: Producto): Observable<Producto> {
    return this._http.post<Producto>(`${this._url}/registrar`, producto);
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    return this._http.put<Producto>(`${this._url}/actualizar`, producto);
  }

  deleteProducto(idProducto: number): Observable<Producto> {
    return this._http.delete<Producto>(`${this._url}/delete/${idProducto}`);
  }
}
