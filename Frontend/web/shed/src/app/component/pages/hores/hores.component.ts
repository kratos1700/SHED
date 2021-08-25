import { Component, OnInit } from '@angular/core';
import { HoraModel } from 'src/app/models/Horas.model';

import { HoraService } from 'src/app/services/hora.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-hores',
  templateUrl: './hores.component.html',
  styleUrls: ['./hores.component.css'],
})
export class HoresComponent implements OnInit {

  hores: HoraModel[] = [];
  

  constructor(private horasService: HoraService,
              private loginService: LoginService,) {}

  ngOnInit(): void {
    /* this.horasService.getHoras.subscribe((data) => {
      console.log('datos del component:', data);
      this.hores = data;
    });  */

   this.loadHores()
    
  }

loadHores(){
  this.horasService.getHooras().subscribe((resp)=>{
    console.log('datos del component:', resp);
    this.hores= resp
    

  })
}



}