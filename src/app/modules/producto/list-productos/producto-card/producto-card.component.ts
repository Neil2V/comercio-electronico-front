import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/shared/model/producto';
import { ProductoStore } from 'src/app/shared/store/producto.store';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent {

  @Input() producto!: Producto;

  constructor(private readonly store: ProductoStore  ) {}

  agregarAlCarrito(producto: Producto): void {
    this.store.setProductos([producto]); // Puedes ajustar según tu lógica de negocio
  }

}
