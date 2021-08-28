import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HoraModel } from 'src/app/models/Horas.model';
import { ToastService } from 'src/app/services/toast.service';
import { HoraService } from '../../../../services/hora.service';
import { FormUtils } from 'src/app/utils/FormUtils';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-form-hores',
  templateUrl: './form-hores.component.html',
  styleUrls: ['./form-hores.component.css'],
})
export class FormHoresComponent implements OnInit {
  dia = new Date();

  private idUsuario: number = 0;

  formulario: FormGroup;
  formUtils = new FormUtils();

  horaExtra: HoraModel = {} as HoraModel;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private horasService: HoraService,
    public dialogRef: MatDialogRef<FormHoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { horaExtra: HoraModel }
  ) {
    this.horaExtra = data.horaExtra;
    this.formulario = formBuilder.group({});
  }

  ngOnInit(): void {
    this.idUsuario = this.loginService.getIdUsuario();
    this.formulario = this.formBuilder.group({
      id: new FormControl(null), //NOS PONDRÁ EL ID Y SI NO EXISTE PONDRÁ NULL
      dia: new FormControl(null, [Validators.required]),
      hores: new FormControl(null, [Validators.required ,Validators.min(0), Validators.pattern("^[0-9]+$")]),
      dieta: new FormControl   (false),          //(this.horaExtra.dieta ? this.horaExtra.dieta : false, []),
      observaciones: new FormControl(null, [Validators.required]),
      pendent: new FormControl (true),    //( this.horaExtra.pendent ? this.horaExtra.pendent : true, []),
      cobrat: new FormControl   (false),   //( this.horaExtra.cobrat ? this.horaExtra.cobrat : false, []), //
      //idUsuario: this.idUsuario,
      
    });
   /*  this.formulario = this.formBuilder.group({
      id: new FormControl(this.horaExtra.id), //NOS PONDRÁ EL ID Y SI NO EXISTE PONDRÁ NULL
      dia: new FormControl(this.horaExtra.dia, []),
      hores: new FormControl(this.horaExtra.hores, []),
      dieta: new FormControl(this.horaExtra.dieta, []),
      observacions: new FormControl(this.horaExtra.observaciones, []),
      pendent: new FormControl( this.horaExtra.pendent ? this.horaExtra.pendent : true, []
      ),
      idUsuario: this.idUsuario,
    }); 
    
     id?: number,
    dia:Date,
    hores: number,
    dieta: boolean,
    observaciones: string,
    pendent?: boolean, // 
    cobrat?: boolean, 
    idUsuario?: number

    
    
    
    
    */
    this.formUtils.formulario = this.formulario;
  }

  enviarFormulario() {
    console.log(
      `este es lel id del usuario al enviar el formulario ${this.idUsuario}`
    );
    console.log(this.formulario.value);

//return;

    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.toast.warning('Revisa el formulario', 10000);
      return;
    }
    this.horaExtra = { ...this.formulario.value };
    console.log(this.horaExtra);
    //SI TIENE ID == ACTUALIZAR
    //SI NO TIENE ID == CREAR

    if (this.horaExtra.id)
      //SI TIENE ID QUIERE DECIR QUE EL ARTICULO EXISTE EN LA BD Y SOLO HAY QUE ACTUALIZARLO
      this.horasService.update(this.horaExtra, this.dialogRef);
    else this.horasService.save(this.horaExtra, this.dialogRef);
  }
}
