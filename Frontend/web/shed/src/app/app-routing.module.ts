import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { FormHoresComponent } from './component/pages/hores/form-hores/form-hores.component';
import { HoresComponent } from './component/pages/hores/hores.component';
import { PrincipalComponent } from './component/pages/principal/principal.component';
import { RegistroComponent } from './component/registro/registro.component';

const routes: Routes = [
   {path:'', redirectTo:'login', pathMatch:'full'},
/*{path:'opiniones',component:OpinionesComponent}, //rutas que usara la pagina despues de /
{path:'articulos',component:ArticulosComponent},
{path: 'articulos/formulario', component: ArticuloFormComponent},
 */
{path:'principal', component:PrincipalComponent},
{path:'registro',component:RegistroComponent},
{path:'login',component:LoginComponent},
{path:'horas',component:HoresComponent},
{path:'horasn',component:FormHoresComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
