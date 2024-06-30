import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductosService } from 'src/app/service/productos.service';
import { Producto } from 'src/app/shared/model/producto';
import { RegeditProductoComponent } from './list-productos/regedit-producto/regedit-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  productos: Producto[] = [];
  isRefreshListado = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productosService: ProductosService,
    private readonly dialog: MatDialog
  ) {
    this.initItems();
   }

   initItems(): void {
    this.productosService.findProductos().subscribe((res) => {
      this.productos = res;
    });
  }

  registrarProducto(): void {
    this.dialog.open(RegeditProductoComponent, {
			width: '900px',
			data: {
				data: null,
				title: 'Registrar'
			},
			disableClose: true
		})
		.afterClosed()
		.subscribe(({refresh}) => {
			if (refresh) {
				this.initItems();
			}
		});
  }
}
