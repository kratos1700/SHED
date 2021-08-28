import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HoraModel } from 'src/app/models/Horas.model';
import { FormHoresComponent } from '../hores/form-hores/form-hores.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  horasExtra: HoraModel[] = []

  constructor( ) { }

  ngOnInit(): void {
  }


}
