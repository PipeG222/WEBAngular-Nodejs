import { Component } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public nombre : String = "";
  public password : String = "";
  public apellidos : String = "";
  public rol : String = "usuario";
  public correo : String = "";
  public celular : String = "";
  public apiResponse : any = ""; 
  
  constructor (private http: HttpClient, private router: Router){}
  
  public validarCredencialesUsuario(){
    var url="http://localhost:8552/api/usuario/crear"
    var headers = new HttpHeaders().set(
     'Content-Type','application/json'
    );
    var body ={
      nombre: this.nombre,
      apelllido: this.apellidos,
      rol: this.rol,
      correo: this.correo,
      celular: this.celular,
      password : this.password,
    }
    this.http.post(url, body, {headers}).subscribe({
      next: resp => {
        var token = this.apiResponse.token
        sessionStorage.setItem('session_token',token)
        console.log('Resena enviado correctamente', resp);
        alert('¡Resena realizado con éxito!');
        this.router.navigate(["/registro"]);

      },
      error: err =>{
        console.log(err);
        console.error('Error al enviar el Resena', err);
        alert('La contraseña debe de tener Tener al menos 8 caracteres Al menos 3 de los siguientes : Al menos una letra, Al menos una letra mayúscula, Al menos un símbolo especial, Al menos un número: ' + err.message);
      }

    });

  }

}  


  
