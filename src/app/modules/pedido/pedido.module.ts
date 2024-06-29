import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { PedidoComponent } from "./pedido.component";
import { ProductoRoutingModule } from "./pedido.routing";
import { ListPedidosComponent } from './list-pedidos/list-pedidos.component';
import { AgGridCustomModule } from "src/app/shared/components/ag-grid-custom/ag-grid-custom.module";

@NgModule({
    declarations: [PedidoComponent, ListPedidosComponent ],
    imports: [CommonModule, ProductoRoutingModule, MatIconModule, HttpClientModule,
        MatTooltipModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatCardModule,
        MatButtonModule, MatSelectModule, ReactiveFormsModule, MatDialogModule, AgGridCustomModule
    ],
    exports: [PedidoComponent],
})
export class PedidoModule { }