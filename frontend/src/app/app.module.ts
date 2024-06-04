import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './Formulario/Formulario.component';
import { ResenasComponent } from './Resenas/Resenas.component';
import { EleccionComponent } from './eleccion/eleccion.component';
import { RegistroComponent } from './registro/registro.component';
import { ListarResenasComponent } from './listar-Resenas/listar-Resenas.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormularioComponent,
    ResenasComponent,
    EleccionComponent,
    RegistroComponent,
    ListarResenasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'registro', component : RegistroComponent },
      { path: 'eleccion', component: EleccionComponent },
      { path: 'Formulario', component:FormularioComponent },
      { path: 'login', component:LoginComponent},
      { path: 'home', component: HomeComponent},
      
    ])
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
export class AppRoutingModule { }
