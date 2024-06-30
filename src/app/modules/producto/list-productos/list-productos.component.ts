import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from 'src/app/shared/model/producto';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.scss']
})
export class ListProductosComponent {

  @Output() emitRefresh = new EventEmitter<boolean>();
  @Input() set productos(v: Producto[]) {
    this.listProductos = v;
  }

  listProductos: Producto[] = [];

  constructor() {
    
  }

}
