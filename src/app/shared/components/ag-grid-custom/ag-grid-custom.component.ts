import { Component, Input, Output, EventEmitter, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { CellEditingStoppedEvent, ColDef, ColumnApi, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable, Subscription, of } from 'rxjs';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'ag-grid-custom',
  templateUrl: './ag-grid-custom.component.html',
  styleUrls: ['./ag-grid-custom.component.scss']
})
export class AgGridCustomComponent implements OnChanges, OnDestroy  {
  @Input() optionActions = 1;

	gridApi!: GridApi;
	_gridColumnApi!: ColumnApi;
	_subscription$: Subscription = new Subscription();
	_subscriptionRowData$?: Subscription;
	selectedRows: any[] = [];

	ngStyleAgGrid: any = { width: '100%', height: '100%' };
	defaultColDef: ColDef = { resizable: true, sortable: true };
	_context: any = { componentParent: this as any };

	get classSearch(): string {
		return this.fillSearch ? 'col-12 my-2' : 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 my-2';
	}
	get ngStyleContainer(): any {
		return { width: '100%', height: this.height };
	}
	get suppressRowClickSelection(): boolean {
		return this.rowSelection === 'single' ? false : true;
	}

	@Input() overlayNoRowsTemplate = `<span class="ag-overlay-loading-center border-0 bg-transparent shadow-none">No se encontraron registros...</span>`;
	overlayLoadingTemplate = `<span class="ag-overlay-loading-top d-flex align-items-center border-0 bg-white shadow p-4 text-info" style="height: 20px;"><img src="assets/media-demo/loading.gif" height="20" width="25" class="mr-2"><strong>Cargando registros</strong></span>`;

	columnDefsActions: ColDef[] = [];

	@Input() menuActions = true;
	@Input() visibleSearch = false;
	@Input() fillSearch = false;
	@Input() height = '20em';
	@Input() rowData: Observable<any[]> = of([]);
	@Input() columnDefs: ColDef[] = [];
	@Input() rowSelection: 'single' | 'multiple' = 'single';
	@Input() domLayout: 'normal' | 'autoHeight' | 'print' = 'normal';
	@Input() set frameworkComponents(value: any) {
		this._frameworkComponents = { ...this._frameworkComponents, ...value };
	}

	@Output() onChangeFilter = new EventEmitter<string>();
	@Output() onGridReady = new EventEmitter<[GridApi, ColumnApi]>();
	@Output() onGridChange = new EventEmitter<[GridApi, ColumnApi]>();
	@Output() onGridSelectChange = new EventEmitter<any[]>();
	@Output() onGridSetAll = new EventEmitter<RowNode>();
	@Output() onEditRow: EventEmitter<any> = new EventEmitter();
	@Output() onDeleteRow: EventEmitter<any> = new EventEmitter();
	@Output() onCellStopEditing: EventEmitter<any> = new EventEmitter();
	_frameworkComponents: any = {
		editComponent: EditComponent
	};

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.gridApi) {
			return;
		}
		if (changes['rowData']) {
			this.initRowData();
		  }
	}

	gridReady(event: GridReadyEvent): void {
		this.columnDefAcciones('editComponent');
		this.gridApi = event.api;
		this._gridColumnApi = event.columnApi;
		this.initRowData();
		this.onGridReady.emit([this.gridApi, this._gridColumnApi]);
	}

	columnDefAcciones(cellRenderer: string): void {
		console.log('cell: ', cellRenderer);

		this.columnDefsActions = this.columnDefs.concat([
			{
				headerName: 'Acciones',
				field: '',
				width: 100,
				minWidth: 100,
				cellClass: ['d-flex justify-content-center align-items-center'],
				cellStyle: { overflow: 'visible' },
				resizable: true,
				sortable: false,
				cellRenderer,
				pinned: 'right',
				suppressMenu: true,
				filter: false,
				lockPosition: true,
			},
		]);
	}

	initRowData(): void {
		if (this._subscriptionRowData$) {
			this._subscriptionRowData$.unsubscribe();
			this.gridApi?.setRowData([]);
			this.gridApi?.showLoadingOverlay();
		}
		this._subscriptionRowData$ = this.rowData.subscribe((data: any[]) => this.gridApi.setRowData(data));
	}

	rowDataChanged(): void {
		if (!this.gridApi) {
			return;
		}
		if (!this.gridApi?.getDisplayedRowCount()) {
			return;
		}
		this.onGridChange.emit([this.gridApi, this._gridColumnApi]);
	}

	selectionChanged(): void {
		this.selectedRows = this.gridApi?.getSelectedRows();
		this.onGridSelectChange.emit(this.gridApi?.getSelectedRows());
	}

	cellStopEditing(evt: CellEditingStoppedEvent) {
		this.onCellStopEditing.emit(evt);
	}

	changeFilter(value: string): void {
		this.gridApi?.setQuickFilter(value);
		this.onChangeFilter.emit(value);
	}

	methodFromParent_edit(cell: number) {
		const ROWNODE = this.gridApi.getDisplayedRowAtIndex(cell);
		this.onEditRow.emit(ROWNODE);
	}

	methodFromParent_deleteBasic(cell: number) {
		const rowNode = this.gridApi.getDisplayedRowAtIndex(cell);
		this.onDeleteRow.emit(rowNode);
	}

	setAll(rowIndex: number): void {
		this.onGridSetAll.emit(this.gridApi?.getDisplayedRowAtIndex(rowIndex));
	}

	ngOnDestroy(): void {
		this._subscription$?.unsubscribe();
		this._subscriptionRowData$?.unsubscribe();
		this.selectedRows.length = 0;
	}
}
