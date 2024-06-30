import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/shared/model/producto';
import { ProductoStore } from 'src/app/shared/store/producto.store';
import { RegeditProductoComponent } from '../regedit-producto/regedit-producto.component';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent {

  @Input() producto!: Producto;

  constructor(private readonly store: ProductoStore, private readonly dialog: MatDialog) { }

  verDetalle(producto: Producto): void {
    this.dialog.open(RegeditProductoComponent, {
      width: '900px',
      data: {
        data: producto,
        title: 'Modificar'
      },
      disableClose: true
    })
      .afterClosed()
      .subscribe(({ refresh }) => {
        if (refresh) {
          //this.initItems();
        }
      });
  }
}
