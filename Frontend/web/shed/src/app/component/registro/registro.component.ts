import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAt, faKey, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Registro } from 'src/app/models/Registro.model';
import { RegistroService } from 'src/app/services/registro.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormUtils } from 'src/app/utils/FormUtils';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [RegistroService] /*CICLO DE VIDA LIGADO AL COMPONENTE, CUANDO SE DESTRUYE EL COMPONENTE SE DESTRUYE EL SERVICIO*/
})
export class RegistroComponent implements OnInit {

  faUser = faUser
  faAt = faAt
  faKey = faKey
  faUserCircle = faUserCircle
  formulario: FormGroup
  formUtils = new FormUtils()


  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private toast:ToastService) {
    this.formulario = this.formBuilder.group({});
  }

  ngOnInit(): void {
    console.log("Iniciando componente registro");
    this.formulario = this.formBuilder.group({
        nombre: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z ]+$')]),
        username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9 ]+$')]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._+-]+@[a-z0-9.]+[.][a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }, {validator: this.matchPassword} as AbstractControlOptions
    )
    this.formUtils.formulario = this.formulario
  }

  private matchPassword(control: AbstractControl) {
    const password = control.get('password')!.value
    const confirmPassword = control.get('confirmPassword')!.value
    if (password !== confirmPassword) {
      control.get('confirmPassword')!
        .setErrors({matchPassword: true})
    }
  }

  public enviarFormulario() {
    this.formulario.markAllAsTouched()

    if (this.formulario.invalid) {
      console.log(this.formulario.errors);
      this.toast.warning("Revisa el formulario",10000)

    
      return;
    }

    const nombre = this.formulario.get('nombre')!.value
    const username = this.formulario.get('username')!.value
    const password = this.formulario.get('password')!.value
    const email = this.formulario.get('email')!.value

    const registro: Registro = {
      nombre, username, password, email
    }
    console.log(registro);


    //SOLO NOS FALTA ENVIARLO AL BACKEND
    this.registroService.registrar(registro)


  }

}