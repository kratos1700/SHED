import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Registrado, Registro} from "../models/Registro.model";

import {ToastService} from "./toast.service";


@Injectable()
export class RegistroService {

  constructor(private httpClient: HttpClient, private toast:ToastService) {
  }
  registrar(registro:Registro){
    this.httpClient.post<Registrado>(`usuarios`, registro).toPromise()
      .then(data => {
        console.log(data.usuario.nombre);
        this.toast.success(`${data.usuario.nombre} Registrat correctament`)
      })
      .catch(err => {
        console.log(err);
      });
  }
}