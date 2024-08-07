import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, forkJoin, of } from 'rxjs';
import { ClienteService } from 'src/app/service/cliente.service';
import { PedidosService } from 'src/app/service/pedidos.service';
import { ProductosService } from 'src/app/service/productos.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { Pedido } from 'src/app/shared/model/pedido';
import { Producto } from 'src/app/shared/model/producto';
import { ProductoPedido } from 'src/app/shared/model/productoPedido';
import { MessageUtilService } from 'src/app/shared/utils/message-util.service';

@Component({
  selector: 'app-regedit-pedido',
  templateUrl: './regedit-pedido.component.html',
  styleUrls: ['./regedit-pedido.component.scss']
})
export class RegeditPedidoComponent implements OnInit {

  private _formGroup!: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  listProductos: Producto[] = [];
  saveProductos: ProductoPedido[] = [];

  isDataDefault: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  o1 = {};


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
    private readonly productosService: ProductosService,
    private readonly pedidoService: PedidosService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private readonly messageUtilService: MessageUtilService,
  ) {
    this.pedido = data['data'] as unknown as Pedido;
    this.title = data['title'] as unknown as string;
    console.log('pedido: ', this.pedido);
    this.loadData();
  }

  ngOnInit(): void {
    this._createForm();
    this.llenarForm();
    this._valueChanges();
  }

  private _createForm(): void {
    this._formGroup = this.fb.group({
      cliente: [null, [Validators.required]],
      productos: [[], [Validators.required]],
      listProductos: [[]],
      total: []
    });
    this.o1 = { ...(this.formGroup.value) };
  }

  private llenarForm(): void {
    if (this.title == 'Registrar') return;

    this.isDataDefault.subscribe((res) => {
      if (res) {

        this.formGroup.get('total')?.setValue(this.pedido.total);
        this.formGroup.get('listProductos')?.setValue(this.pedido.productos);

        this.clientes.forEach((e: Cliente) => {
          if (e.idCliente === this.pedido?.cliente?.idCliente) {
            this.formGroup.get('cliente')?.setValue(e);
            this._changeDetectorRef.detectChanges();
          }
        });


        this.o1 = { ...(this.formGroup.value) };
      }
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
    const productoPedido: ProductoPedido = { idProducto: producto.idProducto };
    productoPedido.nombre = producto.nombre;
    productoPedido.descripcion = producto.descripcion;
    productoPedido.precio = producto.precio;
    productoPedido.cantidad = Number(cantidad);
    productoPedido.categoria = producto.categoria;
    this.saveProductos.push(productoPedido);
  }

  loadData(): void {
    forkJoin([
      this.clienteService.findAllClientes(),
      this.productosService.findProductos()
    ]).subscribe(([c1, c2]) => {
      this.clientes = c1;
      this.productos = c2;
      this.isDataDefault.next(true);
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  guardar(): void {

    const pedido = this.formGroup.getRawValue() as Pedido;

    const pedidoSave: Pedido = {};

    pedidoSave.estado = 'Solicitado';
    pedidoSave.cliente = pedido.cliente;
    pedidoSave.productos = this._listProductoSave();


    if (this.title == 'Registrar') this._save(pedidoSave);
    else if (this.title == 'Modificar') this._update(pedidoSave);
  }

  private _save(pedido: Pedido) {
    if (this.formGroup.valid) {
      this.pedidoService.registrarPedido(pedido).subscribe((res) => {
        this.toastr.success(`Pedido registrado !`, 'Éxito');
        this.dialogRef.close({ refresh: true });
      });
    } else {
      this.toastr.warning(`Debe llenar campos faltantes`, 'Advertencia');
    }
  }

  private _update(pedido: Pedido) {
    if (this.formGroup.valid) {
      this.pedidoService.actualizarPedido(pedido).subscribe((res) => {
        this.toastr.success(`Pedido modificado !`, 'Éxito');
        this.dialogRef.close({ refresh: true });
      });
    } else {
      this.toastr.warning(`Debe llenar campos faltantes`, 'Advertencia');
    }
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
