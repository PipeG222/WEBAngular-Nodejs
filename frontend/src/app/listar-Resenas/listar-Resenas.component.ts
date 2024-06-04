import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-listar-Resenas',
  templateUrl: './listar-Resenas.component.html',
  styleUrls: ['./listar-Resenas.component.css']
})
export class ListarResenasComponent implements OnInit {

  public listadoResenas: any[] = [];
  public editar = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerResenas();

  }
  

  obtenerResenas() {
    const url = "http://localhost:8552/api/Resenas";
    const token = sessionStorage.getItem('session_token');

    if (!token) {
      console.error('token no encontrado');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    this.http.get<{ Resenas: any[] }>(url, { headers }).subscribe({
      next: resp => {
        if (resp && Array.isArray(resp.Resenas)) {
          this.listadoResenas = resp.Resenas.map(resena => ({ ...resena, editMode: false }));
        } else {
          console.error('no contiene nada', resp);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
  actualizaResena(resena: { _id: string, OpRestaurante: string, OpComida: string, CalificacionR: number, CalificacionC: number, Recomendacion: string, cantidad: number }) {
    console.log(resena, "resena ---------------------------")
    
    const url = `http://localhost:8552/api/ResenasU/${resena["_id"]}`;
    const token = sessionStorage.getItem('session_token');
    if (!token) {
      console.error('token no encontrado');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    this.http.put<{ resena: any[] }>(url, resena, { headers }).subscribe({
      next: resp => {
        console.log(resp)
      },
      error: err => {
        console.log(err);
      }
    });
  }

  public activarEdicion(resena: any) {
    resena.editMode = true;
  }

  public desactivarEdicion(resena: any) {
    resena.editMode = false;
  }
  eliminarResena(resenaId: string) {
    const url = `http://localhost:8552/api/ResenasD/${resenaId}`;
    const token = sessionStorage.getItem('session_token');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    this.http.delete(url, { headers }).subscribe({
      next: resp => {
        console.log(resp);
        // Aquí puedes actualizar la lista de reseñas después de eliminar una
        this.obtenerResenas();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  
}



