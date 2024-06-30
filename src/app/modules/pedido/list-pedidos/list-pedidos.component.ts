import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, ColumnApi, GridApi, RowNode, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';
import { PedidosService } from 'src/app/service/pedidos.service';
import { Pedido } from 'src/app/shared/model/pedido';
import { RegeditPedidoComponent } from '../regedit-pedido/regedit-pedido.component';

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
		private readonly pedidosService: PedidosService, private readonly dialog: MatDialog) {
		this._initAgGrid();
	}
	ngOnInit(): void {
		this.initItems();
	}

	private _initAgGrid(): void {
		this.columnDefs = [
			{
				headerName: 'Nro Pedido',
				field: 'nroPedido',
				width: 200,
				resizable: false,
				sortable: true,
				pinned: 'left',
				suppressMenu: true,
				lockPosition: true,
			},
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
				field: 'cliente.nombre',
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
		this.pedidosService.findPedidos().subscribe((res) => {
			this.rowData = of(res);
		});
	}

	onGridReady(gridApi: GridApi, gridColumnApi: ColumnApi): void {
		this.gridApi = gridApi;
		this.gridColumnApi = gridColumnApi;
	}

	deleteRow(rowNode: RowNode): void {
		
	}

	crearPedido(): void {
		this.dialog.open(RegeditPedidoComponent, {
			width: '800px',
			data: {
				data: null,
				title: 'Agregar'
			}
		});
	}

	editRow(rowNode: RowNode): void {
		this.dialog.open(RegeditPedidoComponent, {
			width: '800px',
			data: {
				data: rowNode.data,
				title: 'Modificar'
			}
		});
	}
}
