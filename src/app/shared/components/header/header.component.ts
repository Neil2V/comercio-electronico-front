import { Component } from '@angular/core';
import { ProductoStore } from '../../store/producto.store';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  productos: Producto[] = [];
  mostrarCarrito = false;

  constructor(private readonly store: ProductoStore) {
    this._getProductoStore();
  }

  private _getProductoStore(): void {
    this.store.getProductos$.subscribe((res) => {
      if (res) this.productos = res;
    });
  }
}
