import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-Formulario',
  templateUrl: './Formulario.component.html',
  styleUrls: ['./Formulario.component.css']
})
export class FormularioComponent {
  nuevaResena = {
    OpRestaurante: '',
    OpComida: '',
    CalificacionR: 0,
    CalificacionC: 0,
    Recomendacion: '',
    cantidad: 0

  };
  public mostrarEx : Boolean= false ;
  public mostrarErr : Boolean= false ;
  public apiResponse: any = "";

  constructor(private http: HttpClient) {}

  public enviarResena() {
    const url = 'http://localhost:8552/api/ResenasC';
    const token = sessionStorage.getItem('session_token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token 
    });
    
    const body = {
      OpRestaurante: this.nuevaResena.OpRestaurante,
      OpComida: this.nuevaResena.OpComida,
      CalificacionR: this.nuevaResena.CalificacionR,
      CalificacionC: this.nuevaResena.CalificacionC,
      Recomendacion: this.nuevaResena.Recomendacion,
      cantidad: this.nuevaResena.cantidad,
    };

    this.http.post(url, body, { headers }).subscribe({
      next: resp => {
        console.log('Resena enviado correctamente', resp);
        this.mostrarEx=true;
        this.mostrarErr=false;
        window.location.reload();
        alert('¡Resena realizado con éxito!');
        

      },
      error: err => {
        console.error('Error al enviar el Resena', err);
        this.mostrarErr=true;
        this.mostrarEx=false;
        alert('Ocurrió un error al realizar el Resena. Por favor, inténtalo de nueva.');
      }
    });
  }
}