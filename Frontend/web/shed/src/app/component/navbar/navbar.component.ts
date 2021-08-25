import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  rutas: Ruta[] = [
    {
      path: '/principal',
      nombre: "Principal",
      icon: 'P'
    },
    {
      path: '/horas',
      nombre: "Hores",
      icon: 'H'
    },
    {
      path: '/dieta',
      nombre: "Dieta",
      icon: 'D'
    }
  ]


  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  isLogged() {
    return this.loginService.getLogged()
  }
  cerrarSesion(){
    this.loginService.cerrarSesion();
  }

  getUsuario(){
    return this.loginService.getUsuario()
  }

}


interface Ruta {
  path: string,
  nombre: string,
  icon: string
}