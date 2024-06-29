import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/shared/producto';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.scss']
})
export class ListProductosComponent {

  @Input() set productos(v: Producto[]) {
    console.log('v: ', v);
    this.listProductos = v;
  }

  listProductos: Producto[] = [];

  constructor() {
    
  }

}
