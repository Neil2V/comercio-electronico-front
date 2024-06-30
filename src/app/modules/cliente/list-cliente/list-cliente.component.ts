import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, ColumnApi, GridApi, RowNode, ValueGetterParams } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { RegeditClienteComponent } from '../regedit-cliente/regedit-cliente.component';
import { MessageUtilService } from 'src/app/shared/utils/message-util.service';
import { ToastrService } from 'ngx-toastr';

interface ValueGetterParamsCustom extends ValueGetterParams {
	data: Cliente;
}


@Component({
	selector: 'app-list-cliente',
	templateUrl: './list-cliente.component.html',
	styleUrls: ['./list-cliente.component.scss']
})
export class ListClienteComponent implements OnInit {
	gridApi!: GridApi;
	gridColumnApi?: ColumnApi;
	columnDefs: ColDef[] = [];
	rowData: Observable<any> = of([]);

	listCliente: Cliente[] = [];

	constructor(
		private readonly clienteService: ClienteService, private readonly dialog: MatDialog,
		private readonly messageUtilService: MessageUtilService,
		private toastr: ToastrService,
	) {
		this._initAgGrid();
	}
	ngOnInit(): void {
		this.initItems();
	}

	private _initAgGrid(): void {
		this.columnDefs = [
			{
				headerName: 'Dni',
				field: 'dni',
				width: 270,
				resizable: false,
			},
			{
				headerName: 'Nombres',
				valueGetter: (params: ValueGetterParamsCustom): string => params.data?.nombre + '  ' + params.data?.apellido,
				width: 250,
				resizable: false,
			},
			{
				headerName: 'Telefono',
				field: 'telefono',
				width: 250,
				resizable: false,
			},
			{
				headerName: 'Fecha registro',
				field: 'fchRegistro',
				width: 250,
				valueFormatter: params => {
					const date = params.value;
					if (!date) {
						return '';
					}
					const formattedDate = new Date(date).toLocaleDateString('es-ES');
					return formattedDate;
				},
				resizable: false,
			}
		];
	}

	initItems(): void {
		this.clienteService.findAllClientes().subscribe((res) => {
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
				this.clienteService.deleteCliente(rowNode.data.idCliente).subscribe((res) => {
					this.toastr.success(`Cliente ${res.nombre} eliminado !`, 'Éxito');
					this.initItems();
				});
			}
		});
	}

	registrarCliente(): void {
		this.dialog.open(RegeditClienteComponent, {
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
		this.dialog.open(RegeditClienteComponent, {
			width: '800px',
			data: {
				data: rowNode.data,
				title: 'Modificar'
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
