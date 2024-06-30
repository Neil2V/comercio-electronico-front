import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { ToastrService } from 'ngx-toastr';
import { isEqual } from 'lodash';
import Swal from 'sweetalert2';
import { MessageUtilService } from 'src/app/shared/utils/message-util.service';



@Component({
  selector: 'app-regedit-cliente',
  templateUrl: './regedit-cliente.component.html',
  styleUrls: ['./regedit-cliente.component.scss']
})
export class RegeditClienteComponent implements OnInit {
  private _formGroup!: FormGroup;

  cliente!: Cliente;
  title = '';

  o1 = {};


  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Record<string, unknown>,
    public readonly dialogRef: MatDialogRef<RegeditClienteComponent>,
    private readonly fb: FormBuilder,
    private readonly clienteService: ClienteService,
    private toastr: ToastrService,
    private readonly messageUtilService: MessageUtilService,
  ) { 
    this.cliente = data['data'] as unknown as Cliente;
    this.title = data['title'] as unknown as string;
  }

  ngOnInit(): void {
    this._createForm();
    this.llenarForm();
  }

  private _createForm(): void {
    this._formGroup = this.fb.group({
      nombre: ['',  [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: [''],
      dni: ['', [Validators.required]]
    });
    this.o1 = { ...(this.formGroup.value) };
  }

  private llenarForm(): void {
    if(this.title == 'Agregar') return ;

    this.formGroup.patchValue({
      ...this.cliente
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
    const cliente = this.formGroup.getRawValue() as Cliente;

    if (this.title == 'Agregar') this._save(cliente);
    else if(this.title == 'Modificar') this._update(cliente);
  }

  private _save(cliente: Cliente): void {
    if (this.formGroup.valid) {
      this.clienteService.registrarCliente(cliente).subscribe((res) => {
        if (res.nuevo) {
          this.toastr.success(`Cliente ${res.nombre} registrado !`, 'Éxito');
          this.dialogRef.close({refresh: true});
        }
        else this.toastr.warning(`Ya existe un usuario con dni ${res.dni}`, 'Advertencia');
      });
    } else {
      this.toastr.warning(`Debe llenar campos faltantes`, 'Advertencia');
    }
  }

  private _update(cliente: Cliente): void {
    if (this.formGroup.valid) {
      this.clienteService.actualizarCliente(cliente).subscribe((res) => {
          this.toastr.success(`Cliente ${res.nombre} modificado !`, 'Éxito');
          this.dialogRef.close({refresh: true});
      });
    } else {
      this.toastr.warning(`Debe llenar campos faltantes`, 'Advertencia');
    }
  }
}
