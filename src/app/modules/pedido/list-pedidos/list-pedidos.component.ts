import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, ColumnApi, GridApi, RowNode, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';
import { PedidosService } from 'src/app/service/pedidos.service';
import { Pedido } from 'src/app/shared/model/pedido';
import { RegeditPedidoComponent } from '../regedit-pedido/regedit-pedido.component';
import { MessageUtilService } from 'src/app/shared/utils/message-util.service';
import { ToastrService } from 'ngx-toastr';

interface ValueGetterParamsCustom extends ValueGetterParams {
	data: Pedido;
}

@Component({
	selector: 'app-list-pedidos',
	templateUrl: './list-pedidos.component.html',
	styleUrls: ['./list-pedidos.component.scss']
})
export class ListPedidosComponent implements OnInit {

	gridApi!: GridApi;
	gridColumnApi?: ColumnApi;
	columnDefs: ColDef[] = [];
	rowData: Observable<any> = of([]);

	listPedidos: Pedido[] = [];

	constructor(
		private readonly pedidosService: PedidosService, private readonly dialog: MatDialog,
		private readonly messageUtilService: MessageUtilService,
		private toastr: ToastrService
	) {
		this._initAgGrid();
	}
	ngOnInit(): void {
		this.initItems();
	}

	private _initAgGrid(): void {
		this.columnDefs = [
			{
				headerName: 'Fecha registro',
				field: 'fchRegistro',
				width: 150,
				valueFormatter: params => {
					const date = params.value;
					if (!date) {
					  return '';
					}
					const formattedDate = new Date(date).toLocaleDateString('es-ES');
					return formattedDate;
				},
				resizable: false,
			},
			{
				headerName: 'Cliente',
				field: 'cliente',
				width: 250,
				valueGetter: (params: ValueGetterParamsCustom): string => params.data.cliente?.nombre + '  ' + params.data.cliente?.apellido,
				resizable: false,
			},
			{
				headerName: 'Telefono',
				field: 'cliente.telefono',
				width: 150,
				resizable: false,
			},
			{
				headerName: 'Estado',
				field: 'estado',
				width: 200,
				resizable: false,
			},
			{
				headerName: 'Total',
				field: 'total',
				width: 170,
				resizable: false,
			}
		];
	}

	initItems(): void {
		this.pedidosService.findAllPedidos().subscribe((res) => {
			this.rowData = of(res);
		});
	}

	onGridReady(gridApi: GridApi, gridColumnApi: ColumnApi): void {
		this.gridApi = gridApi;
		this.gridColumnApi = gridColumnApi;
	}

	deleteRow(rowNode: RowNode): void {
		this.messageUtilService.getMessageQuestion(`¿Desea eliminar el cliente?`, '').then((res) => {
			if (res.value) {
				this.pedidosService.deletePedido(rowNode.data.id).subscribe((res) => {
					this.toastr.success(`Pedido ${res.id} eliminado !`, 'Éxito');
					this.initItems();
				});
			}
		});
	}

	crearPedido(): void {
		this.dialog.open(RegeditPedidoComponent, {
			width: '800px',
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

	editRow(rowNode: RowNode): void {
		this.dialog.open(RegeditPedidoComponent, {
			width: '800px',
			data: {
				data: rowNode.data,
				title: 'Modificar'
			},
			disableClose: true
		});
	}
}
