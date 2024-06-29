import { Component } from '@angular/core';
import { ProductoStore } from '../../store/producto.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private readonly store: ProductoStore) {
    this._getProductoStore();
  }

  private _getProductoStore(): void {
    this.store.getProductos$.subscribe((res) => {
      console.log('res: ', res);
    });
  }
}
