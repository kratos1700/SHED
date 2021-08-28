import { Component, Input, OnInit } from '@angular/core';
import { HoraModel } from 'src/app/models/Horas.model';
import {faEdit,faTrashAlt, faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-taula-hores',
  templateUrl: './taula-hores.component.html',
  styleUrls: ['./taula-hores.component.css']
})
export class TaulaHoresComponent implements OnInit {

  editar = faEdit;
  eliminar = faTrashAlt;
  cobrat=faHandHoldingUsd

  @Input() 
  hores:HoraModel[]=[];

  @Input() 
  horesCobrades:HoraModel[]=[];


  constructor() { }

  ngOnInit(): void {
  }

  
}
