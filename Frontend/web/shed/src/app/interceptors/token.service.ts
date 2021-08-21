import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService:LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // comprobamos k estamos logeados y recuperamos token
    
      const token= this.loginService.getToken();
      if(token){
        req=req.clone({ // clonamos la peticion req y le añadimos una cabecera para el token
          headers:req.headers.set('Authorization',token)
        })
      }
    
    return next.handle(req);
  }
}
