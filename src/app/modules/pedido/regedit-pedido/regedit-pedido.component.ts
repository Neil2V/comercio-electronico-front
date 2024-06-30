import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, combineLatest, distinctUntilChanged, forkJoin, of } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';
import { ProductosService } from 'src/app/service/productos.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { Pedido } from 'src/app/shared/model/pedido';
import { Producto } from 'src/app/shared/model/producto';
import { ProductoPedido } from 'src/app/shared/model/productoPedido';

@Component({
  selector: 'app-regedit-pedido',
  templateUrl: './regedit-pedido.component.html',
  styleUrls: ['./regedit-pedido.component.scss']
})
export class RegeditPedidoComponent implements OnInit{

  private _formGroup!: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  listProductos: Producto[] = [];
  saveProductos: ProductoPedido[] = [];

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
    this._valueChanges();
  }

  private _createForm(): void {
    this._formGroup = this.fb.group({
      cliente: [null, [Validators.required]],
      productos: [[], [Validators.required]],
      listProductos: [[]],
      total: []
    });
  }

  private _valueChanges(): void {
    this.formGroup.get('productos')?.valueChanges.pipe(distinctUntilChanged()).subscribe((res) => {
      this.listProductos = res;
    });
  }

    onCantidadChange(event: Event, producto: Producto): void {
      const inputElement = event.target as HTMLInputElement;
      const cantidad = inputElement.value;
      const productoPedido: ProductoPedido = {idProducto: producto.idProducto};
      productoPedido.nombre = producto.nombre;
      productoPedido.descripcion = producto.descripcion;
      productoPedido.precio = producto.precio;
      productoPedido.cantidad = Number(cantidad);
      productoPedido.categoria = producto.categoria;
       this.saveProductos.push(productoPedido);
    }

  loadData(): void {
    combineLatest([
      this.clienteService.findAllClientes(),
      this.productosService.findProductos()
    ]).subscribe(([c1, c2]) => {
      this.clientes = c1;
      this.productos = c2;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    
  }

  private _listProductoSave(): ProductoPedido[] {
    const productosUnicos = this.saveProductos.reduce((acc: { [key: number]: ProductoPedido }, producto: ProductoPedido) => {
      acc[producto.idProducto] = producto;
      return acc;
    }, {});
    const listaFiltrada: ProductoPedido[] = Object.values(productosUnicos);
    return listaFiltrada;
  }
}
