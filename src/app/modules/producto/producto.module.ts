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
import { ProductoComponent } from "./producto.component";
import { ProductoRoutingModule } from "./producto.routing";
import { ListProductosComponent } from './list-productos/list-productos.component';
import { ProductoCardComponent } from './list-productos/producto-card/producto-card.component';

@NgModule({
    declarations: [ProductoComponent, ListProductosComponent, ProductoCardComponent],
    imports: [CommonModule, ProductoRoutingModule, MatIconModule, HttpClientModule,
        MatTooltipModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatCardModule,
        MatButtonModule, MatSelectModule, ReactiveFormsModule, MatDialogModule
    ],
    exports: [ProductoComponent],
})
export class JobModule { }