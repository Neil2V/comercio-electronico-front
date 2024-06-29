import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/service/productos.service';
import { Producto } from 'src/app/shared/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  private _formGroup!: FormGroup;

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly productosService: ProductosService
  ) {
    this.initItems();
   }

   ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this._formGroup = this.fb.group({
      job: [''],
      country: [null],
      webSites: [[]]
    });
  }

  initItems(): void {
    this.productosService.findProductos().subscribe((res) => {
      this.productos = res;
    });
  }

}
