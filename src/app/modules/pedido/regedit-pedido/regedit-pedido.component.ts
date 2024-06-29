import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { Pedido } from 'src/app/shared/model/pedido';

@Component({
  selector: 'app-regedit-pedido',
  templateUrl: './regedit-pedido.component.html',
  styleUrls: ['./regedit-pedido.component.scss']
})
export class RegeditPedidoComponent implements OnInit{

  private _formGroup!: FormGroup;
  clientes: Cliente[] = [];
  pedido!: Pedido;
  title = '';

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Record<string, unknown>,
    public readonly dialogRef: MatDialogRef<RegeditPedidoComponent>,
    private readonly fb: FormBuilder,
    private readonly clienteService: ClienteService
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
    });
  }

  loadData(): void {
    this.clienteService.findClientes().subscribe((res) => {
      this.clientes = res;
    });
  }

  close(): void {
    this.dialogRef.close();
  }


}
