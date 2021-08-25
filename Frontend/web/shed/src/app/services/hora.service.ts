import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { HoraModel, HorasModelResponse, HoraModelResponse } from '../models/Horas.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class HoraService {

 
  //Guarda los datos recibidos del servidor, no podemos usar una lista por que siempre nos dara la vista vacia.
 // el BehaviorSubject se tiene que inicializar siempre como un array vacio
 private horas:BehaviorSubject<HoraModel[]>= new BehaviorSubject<HoraModel[]>([])

//get getHoras(){
 // this.checkLast()
 //return this.horas.asObservable() //convertimos la lista en observable para recuperarla en otro sitio
//}



getHooras():Observable<HoraModel[]> {
  return this.http.get<HorasModelResponse>('horas')
  .pipe(map((resp)=>{
    console.log('datos del service :', resp.hores);
    return resp.hores
  })
  )
}

constructor(private http: HttpClient,private toast: ToastService) {
  
 this.findAll()// al iniciar el servicio no hace la peticion directamente
}


// funcion para obtener todos los articulos
private findAll() { //PETICIONES ASYNCRONAS
  this.http.get<HorasModelResponse>(`horas`)
  .pipe(first())
  .subscribe(data=>{
    console.log('respuesta del backend',data);
    this.horas.next(data.hores);// envia a la lista privada la respusta del server.
  })
}

private checkLast() {
  // RECUPERAR LA ULTIMA ACTUALIZACIÓN DE LOS DATOS
}



//PETICIONES PARA ADMINS!!
save(hora: HoraModel) {
  this.http.post<HoraModelResponse>('horas', hora) //peticion post sirve para crear algo //articulos--> http://localhost:3000/articulos
    .pipe(first())
    .subscribe((data) => {
      this.toast.success(data.msg)
      this.horas.value.push(data.hora)
      this.horas.next(this.horas.value)
    })
}


}
