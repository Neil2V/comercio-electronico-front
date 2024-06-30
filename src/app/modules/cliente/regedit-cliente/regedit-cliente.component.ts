import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-regedit-cliente',
  templateUrl: './regedit-cliente.component.html',
  styleUrls: ['./regedit-cliente.component.scss']
})
export class RegeditClienteComponent implements OnInit {
  private _formGroup!: FormGroup;

  cliente!: Cliente;
  title = '';

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Record<string, unknown>,
    public readonly dialogRef: MatDialogRef<RegeditClienteComponent>,
    private readonly fb: FormBuilder,
    private readonly clienteService: ClienteService,
    private toastr: ToastrService
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
  }

  private llenarForm(): void {
    if(this.title == 'Agregar') return ;

    this.formGroup.patchValue({
      ...this.cliente
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    const cliente = this.formGroup.getRawValue() as Cliente;
    this.clienteService.registrarCliene(cliente).subscribe((res) => {
      this.toastr.success(`'Cliente '${res.nombre} guardado !`, 'Éxito');
    });
  }

}
