import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HoraModel } from 'src/app/models/Horas.model';

import { HoraService } from 'src/app/services/hora.service';
import { LoginService } from 'src/app/services/login.service';
import { FormHoresComponent } from './form-hores/form-hores.component';

@Component({
  selector: 'app-hores',
  templateUrl: './hores.component.html',
  styleUrls: ['./hores.component.css'],
})
export class HoresComponent implements OnInit {

  hores: HoraModel[] = [];
  horasExtra: HoraModel[] = [];
  

  constructor(private horasService: HoraService,
              private loginService: LoginService,
              public dialog: MatDialog) {}

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




openDialog(horasExtra?: HoraModel) {
  if (!horasExtra) {
    horasExtra = {} as HoraModel
  }
  console.log(horasExtra);
  const dialogRef = this.dialog.open(FormHoresComponent, {
    data: {
      horasExtra: horasExtra
    },
    width: '80%',
    height: '80%'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}



}