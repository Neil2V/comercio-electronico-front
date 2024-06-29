import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../model/producto';
import { ProductoStore } from '../../store/producto.store';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  @Input() set productos(v: Producto[]) {
    if (v) {
      this.listProductos = v;
    }
  }

  listProductos: Producto[] = [];

  @Output() emitAñadirProducto = new EventEmitter<Producto>();
  @Output() emitQuitarProducto = new EventEmitter<Producto>();


  constructor(private readonly store: ProductoStore) {
    
  }

  eliminarDelCarrito(index: number) {
    if (index >= 0 && index < this.listProductos.length) {
      this.listProductos.splice(index, 1);
      this.store.deleteProductos(this.listProductos);
    }
  }

  addProducto(producto: Producto): void {
    this.emitAñadirProducto.emit(producto);
  }

  decrementProducto(producto: Producto): void {
    this.emitQuitarProducto.emit(producto);
  }

  crearPedido(): void {
    console.log('crear pedido');
  }
}
