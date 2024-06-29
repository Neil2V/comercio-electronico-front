import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-delete',
  template: `
		<button type="button" (click)="invokeParentMethod_delete()" class="btn btn-transparent px-2 py-0">
			<i class="fa fa-trash text-danger p-0"></i>
		</button>
	`,
	styles: [],
})
export class DeleteComponent implements ICellRendererAngularComp{
  public params: any;
	agInit(params: any): void {
		this.params = params;
	}
	refresh(params: any): boolean {
		return false;
	}

	public invokeParentMethod_delete() {
		this.params.context.componentParent.methodFromParent_deleteBasic(`${this.params.node.rowIndex}`);
	}
}
