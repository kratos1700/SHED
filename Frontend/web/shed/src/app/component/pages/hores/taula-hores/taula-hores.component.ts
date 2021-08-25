import { Component, Input, OnInit } from '@angular/core';
import { HoraModel } from 'src/app/models/Horas.model';

@Component({
  selector: 'app-taula-hores',
  templateUrl: './taula-hores.component.html',
  styleUrls: ['./taula-hores.component.css']
})
export class TaulaHoresComponent implements OnInit {

  

  @Input() 
  hores:HoraModel[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
