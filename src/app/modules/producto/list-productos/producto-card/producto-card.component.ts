import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/shared/model/producto';
import { ProductoStore } from 'src/app/shared/store/producto.store';
import { RegeditProductoComponent } from '../regedit-producto/regedit-producto.component';
import { ProductosService } from 'src/app/service/productos.service';
import { MessageUtilService } from 'src/app/shared/utils/message-util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent {

  @Output() emitRefresh = new EventEmitter<boolean>(false);
  @Input() producto!: Producto;

  constructor(private readonly store: ProductoStore, private readonly dialog: MatDialog,     
    private readonly productosService: ProductosService,
    private readonly messageUtilService: MessageUtilService,
    private toastr: ToastrService,
  ) { }

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
        console.log('refresh: ', refresh);
        if (refresh) {
          this.emitRefresh.emit(true);
        }
      });
  }

  deleteProducto(producto: Producto): void {
    this.messageUtilService.getMessageQuestion(`¿Desea eliminar el cliente?`, '').then((res) => {
			if (res.value) {
        this.productosService.deleteProducto(producto.idProducto).subscribe((res) => {
					this.toastr.success(`Producto ${res.nombre} eliminado !`, 'Éxito');
					this.emitRefresh.emit(true);
        });
			}
		});
  }
}
