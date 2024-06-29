import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, ColumnApi, GridApi, RowNode, ValueGetterParams } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';
import { PedidosService } from 'src/app/service/pedidos.service';
import { Pedido } from 'src/app/shared/model/pedido';

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

	constructor(private readonly clienteService: ClienteService,
		private readonly pedidosService: PedidosService) {
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
			},
			{
				headerName: 'Cliente',
				field: 'cliente.nombre',
				width: 200,
				valueGetter: (params: ValueGetterParamsCustom): string => params.data.cliente?.nombre + '  ' + params.data.cliente?.apellido,
				resizable: false,
				sortable: true,
				pinned: 'left',
				suppressMenu: true,
				lockPosition: true,
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
				width: 200,
				resizable: false,
			}
		];
	}

	initItems(): void {
		this.pedidosService.findPedidos().subscribe((res) => {
			this.rowData = of(res);
		});
	}

	onButtonAction(typeAction: string, actionCode: string, resource?: any, resourceList?: unknown[]): void {
		//const cotizacion: SacCotizacion = resource?.data;
		switch (typeAction) {
			case 'ActionAgGrid':
				switch (actionCode) {
					case 'ACC-FLETE-CARGOS':
						//this._openFleteCargos(cotizacion);
						break;
				}
				break;
		}
	}

	onGridReady(gridApi: GridApi, gridColumnApi: ColumnApi): void {
		this.gridApi = gridApi;
		this.gridColumnApi = gridColumnApi;
	}

	deleteRow(rowNode: RowNode): void {
		/*this.listSacCotizacionContenedores = [];
		this.rowData.subscribe((res: FormGroup[]) => {
			res.forEach((e) => {
				const sacCotizacionContenedor = e.getRawValue() as SacCotizacionContenedor;
				if (FormGroupCompare.isDifferentForm(rowNode.data.value, e.value)) {
					this.listSacCotizacionContenedores?.push(sacCotizacionContenedor);
				}
			});
			const forms = this.listSacCotizacionContenedores?.map((e) => {
				const form = this._crearFormGrilla();
				this._llenarForm(form, e);
				return form;
			});
			if (forms) this.rowData = of(forms);
		});*/
	}
}
