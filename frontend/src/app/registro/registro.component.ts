import { Component } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public correo : String = "";
  public password : String = "";
  public apiResponse : any = ""; 
  
  constructor (private http: HttpClient,private router: Router){}
  ngOnInit(){
    var token = sessionStorage.getItem('session_token');
    if(token != null){
      this.router.navigate(["home"]);
    }
  }
  public validarCredencialesUsuari(){
    
    var url="http://localhost:8552/api/usuario/iniciarsesion"

    var headers = new HttpHeaders().set(
     'Content-Type','application/json'
    );

    var body ={
      
      password : this.password,
      correo : this.correo

    }
    this.http.post(url, body, {headers}).subscribe({
      next: resp => {
        this.apiResponse = resp;
        var token = this.apiResponse.token;
        sessionStorage.setItem('session_token',token);
        this.router.navigate(["/home"]);
        //console.log('Resena enviado correctamente');
        // alert('¡Resena realizado con éxito!');

      },
      error: err =>{
        console.log(err);
        console.error('Error al enviar el Resena', err);
        alert('Error al enviar el Resena: ' + err.message);
      }

    });

  }

} 