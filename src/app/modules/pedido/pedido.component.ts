import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { PedidosService } from 'src/app/service/pedidos.service';
import { ProductosService } from 'src/app/service/productos.service';
import { Pedido } from 'src/app/shared/model/pedido';
import { Producto } from 'src/app/shared/model/producto';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedidos: Pedido[] = [];
  private _formGroup!: FormGroup;

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(
    private readonly fb: FormBuilder,
  ) { }

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
}
