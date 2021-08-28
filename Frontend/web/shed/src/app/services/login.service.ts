import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import {HttpClient} from "@angular/common/http";
import jwtDecode from 'jwt-decode';
import { first} from "rxjs/operators";
import { UsuarioToken } from '../models/Usuario.model';
import { UsuarioLogin, UsuarioLogueado } from '../models/Login.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  
  private token: string | null = null
  private logged = false;
  private admin = false;
  private usuario: UsuarioToken | null = null
  private idUsuario:number | null = null;
 

  constructor(private http: HttpClient, private toast: ToastService, private spinner: NgxSpinnerService) {
    const token = localStorage.getItem("token")
    if (token !== null) {
      this.token = token
      this.logged = true
      this.decodeToken()
      if (this.usuario?.role===0) this.admin=true;
    }
  }

  
  getToken() {
    return this.token
  }

  getLogged() {
    return this.logged
  }

  getUsuario() {
    return this.usuario
  }

  getIdUsuario() {
    return this.usuario!.id
  }

  isAdmin(){
   return this.admin;
  }
  getIdUser() {
    return this.idUsuario;
  }


  login(usuario: UsuarioLogin) {

    this.http.post<UsuarioLogueado>(`login`, usuario)
      .pipe(first())
      .subscribe((data: UsuarioLogueado) => {
        this.token = data.token
        localStorage.setItem("token", this.token)
        this.logged = true;
        this.decodeToken()
        if(this.usuario?.role===0){
          this.admin=true;
        }
        this.toast.success("Has iniciado sesión con éxito")
      })

  }

  cerrarSesion() {
    this.token = null;
    this.logged = false;
    this.admin= false;
    localStorage.removeItem("token")
    this.toast.info("Has cerrado sesión con éxito")
  }

  decodeToken() {
    if (this.token !== null) {
      const decoded: UsuarioToken = jwtDecode(this.token)
      if (decoded != null) {
        console.log(decoded);
        this.usuario = {
          id: decoded.id,
          username: decoded.username,
          role: decoded.role,
          exp: decoded.exp * 1000 /** MULTIPLICAMOS POR MIL PARA PONER LOS MILISEGUNDOS**/
        }
        this.idUsuario= decoded.id;
        const hoy = new Date()
        /**
         * SI LUNES 16 es más grande que hoy NO cerramos sesión
         * EN CASO CONTRARIO LA CERRAMOS
         */
        if (hoy.getTime() > this.usuario.exp)
          this.cerrarSesion()
      }
    }
  }


}
