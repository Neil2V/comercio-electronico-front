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
import { AgGridCustomModule } from "src/app/shared/components/ag-grid-custom/ag-grid-custom.module";
import { ClienteComponent } from "./cliente.component";
import { ClienteRoutingModule } from "./cliente.routing";
import { ListClienteComponent } from "./list-cliente/list-cliente.component";
import { RegeditClienteComponent } from "./regedit-cliente/regedit-cliente.component";

@NgModule({
    declarations: [ClienteComponent, ListClienteComponent, RegeditClienteComponent ],
    imports: [CommonModule, ClienteRoutingModule, MatIconModule, HttpClientModule,
        MatTooltipModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatCardModule,
        MatButtonModule, MatSelectModule, ReactiveFormsModule, MatDialogModule, AgGridCustomModule
    ],
    exports: [ClienteComponent],
})
export class ClienteModule { }