import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-edit',
  template: `
  <button
    (click)="invokeParentMethod_edit()"
    matTooltip="Modificar"
    matTooltipClass="bg-warning"
    class="btn btn-transparent px-2 py-0">
    <i class="fa fa-pen text-warning p-0"></i>
  </button>
  <button
    (click)="invokeParentMethod_delete()"
    matTooltip="Eliminar"
    matTooltipClass="bg-danger"
    class="btn btn-transparent px-2 py-0">
    <i class="fa fa-trash text-danger p-0"></i>
  </button>
`,
styles: [],
})
export class EditComponent implements ICellRendererAngularComp {
  public params: any;
	agInit(params: any): void {
		this.params = params;
	}
	refresh(params: any): boolean {
		return false;
	}
	public invokeParentMethod_edit() {
		this.params.context.componentParent.methodFromParent_edit(`${this.params.node.rowIndex}`);
	}

	public invokeParentMethod_delete() {
		this.params.context.componentParent.methodFromParent_deleteBasic(`${this.params.node.rowIndex}`);
	}
}
