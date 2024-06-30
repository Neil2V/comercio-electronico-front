import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEqual } from 'lodash-es';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from 'src/app/service/productos.service';
import { Producto } from 'src/app/shared/model/producto';
import { MessageUtilService } from 'src/app/shared/utils/message-util.service';

@Component({
  selector: 'app-regedit-producto',
  templateUrl: './regedit-producto.component.html',
  styleUrls: ['./regedit-producto.component.scss']
})
export class RegeditProductoComponent implements OnInit{
  private _formGroup!: FormGroup;

  producto!: Producto;
  title = '';

  o1 = {};

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Record<string, unknown>,
    public readonly dialogRef: MatDialogRef<RegeditProductoComponent>,
    private readonly fb: FormBuilder,
    private readonly productoService: ProductosService,
    private toastr: ToastrService,
    private readonly messageUtilService: MessageUtilService,
  ) { 
    this.producto = data['data'] as unknown as Producto;
    this.title = data['title'] as unknown as string;
  }

  ngOnInit(): void {
    this._createForm();
    this.llenarForm();
  }

  private _createForm(): void {
    this._formGroup = this.fb.group({
      idProducto: [],
      nombre: ['',  [Validators.required]],
      precio: [, [Validators.required]],
      descripcion: [''],
      categoria: [''],
      codigo: ['', [Validators.required]],
      stock: [, [Validators.required]],
    });
    this.o1 = { ...(this.formGroup.value) };
  }

  private llenarForm(): void {
    if(this.title == 'Registrar') return ;

    this.formGroup.patchValue({
      ...this.producto
    });
    this.o1 = { ...(this.formGroup.value) };
  }

  close(): void {
    if (!this.isFormDifferent()) {
      this.messageCloseDialog();
    }
		else {
      this.dialogRef.close({refresh: false});
    }
  }

  messageCloseDialog(): void {
		this.messageUtilService.getMessageQuestion(`¿Desea cancelar el registro?`, 'Los cambios realizados no se guardarán').then((res) => {
			if (res.value) this.dialogRef.close({refresh: false});
		});
	}

  isFormDifferent(): boolean {
    return isEqual(this.formGroup.value, this.o1);
  }

  guardar(): void {
    const producto = this.formGroup.getRawValue() as Producto;
    if (this.title == 'Registrar') this._save(producto);
    else if(this.title == 'Modificar') this._update(producto);
  }

  private _save(producto: Producto): void {
    if (this.formGroup.valid) {
      this.productoService.registrarProducto(producto).subscribe((res) => {
        if (res.nuevo) {
          this.toastr.success(`Producto ${res.nombre} registrado !`, 'Éxito');
          this.dialogRef.close({refresh: true});
        }
        else this.toastr.warning(`Ya existe un producto con id ${res.idProducto}`, 'Advertencia');
      });
    } else {
      this.toastr.warning(`Debe llenar campos faltantes`, 'Advertencia');
    }
  }

  private _update(producto: Producto): void {
    if (this.formGroup.valid) {
      this.productoService.actualizarProducto(producto).subscribe((res) => {
          this.toastr.success(`Producto ${res.nombre} modificado !`, 'Éxito');
          this.dialogRef.close({refresh: true});
      });
    } else {
      this.toastr.warning(`Debe llenar campos faltantes`, 'Advertencia');
    }
  }
}
