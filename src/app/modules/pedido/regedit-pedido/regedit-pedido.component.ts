import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';
import { ProductosService } from 'src/app/service/productos.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { Pedido } from 'src/app/shared/model/pedido';
import { Producto } from 'src/app/shared/model/producto';

@Component({
  selector: 'app-regedit-pedido',
  templateUrl: './regedit-pedido.component.html',
  styleUrls: ['./regedit-pedido.component.scss']
})
export class RegeditPedidoComponent implements OnInit{

  private _formGroup!: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];

  pedido!: Pedido;
  title = '';

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Record<string, unknown>,
    public readonly dialogRef: MatDialogRef<RegeditPedidoComponent>,
    private readonly fb: FormBuilder,
    private readonly clienteService: ClienteService,
    private readonly productosService: ProductosService
  ) { 
    this.pedido = data['data'] as unknown as Pedido;
    this.title = data['title'] as unknown as string;
    this.loadData();
  }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this._formGroup = this.fb.group({
      cliente: [null],
      producto: [[]]
    });
  }

  loadData(): void {

    combineLatest([
      this.clienteService.findClientes(),
      this.productosService.findProductos()
    ]).subscribe(([c1, c2]) => {
      this.clientes = c1;
      this.productos = c2;
    });
  }

  close(): void {
    this.dialogRef.close();
  }


}
