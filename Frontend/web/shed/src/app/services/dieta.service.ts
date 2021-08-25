import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { DietaModel, DietasModelResponse } from '../models/Dietas.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class DietaService {


  //Guarda los datos recibidos del servidor, no podemos usar una lista por que siempre nos dara la vista vacia.
 // el BehaviorSubject se tiene que inicializar siempre como un array vacio
 private dietas:BehaviorSubject<DietaModel[]>= new BehaviorSubject<DietaModel[]>([])

 get getDietas(){
  this.checkLast()

 return this.dietas.asObservable() //convertimos la lista en observable para recuperarla en otro sitio
}


constructor(private http: HttpClient,private toast: ToastService) {
  this.findAll()// al iniciar el servicio no hace la peticion directamente
}


// funcion para obtener todos los articulos
private findAll() { //PETICIONES ASYNCRONAS
  this.http.get<DietasModelResponse>(`dietas`)
  .pipe(first())
  .subscribe(data=>{
    console.log(data);
    this.dietas.next(data.dietas);// envia a la lista privada la respusta del server.

    
  })
}

private checkLast() {
  // RECUPERAR LA ULTIMA ACTUALIZACIÓN DE LOS DATOS
}





}
