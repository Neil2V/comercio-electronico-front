import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/shared/model/producto';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent {

  @Input() producto!: Producto;

}
