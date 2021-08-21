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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent
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
   
    FontAwesomeModule
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
