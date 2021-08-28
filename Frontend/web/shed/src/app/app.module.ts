import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingInterceptorService } from './interceptors/loading.interceptor.service';
import { ErrorsInterceptorService } from './interceptors/errors.interceptor.service';
import { TokenInterceptorService } from './interceptors/token.service';
import { BaseUrlInterceptorService } from './interceptors/base-url-interceptor.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RegistroComponent } from './component/registro/registro.component';
import { PrincipalComponent } from './component/pages/principal/principal.component';
import { RegistreHoresComponent } from './component/pages/registre-hores/registre-hores.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import { HoresComponent } from './component/pages/hores/hores.component';
import { TaulaHoresComponent } from './component/pages/hores/taula-hores/taula-hores.component';
import { FormHoresComponent } from './component/pages/hores/form-hores/form-hores.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    RegistreHoresComponent,
    HoresComponent,
    TaulaHoresComponent,
    FormHoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule, 
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorsInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:BaseUrlInterceptorService,
      multi:true
    }
   
],

  bootstrap: [AppComponent]
})
export class AppModule { }
