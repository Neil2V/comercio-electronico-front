import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InputSearchComponent } from './input-search/input-search.component';
import { AgGridCustomComponent } from './ag-grid-custom.component';
import { EditComponent } from './edit/edit.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [InputSearchComponent, AgGridCustomComponent, EditComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, AgGridModule, MatTooltipModule],
	exports: [AgGridCustomComponent],
})
export class AgGridCustomModule {}
