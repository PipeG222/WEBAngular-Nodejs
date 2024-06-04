import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router){}

  ngOnInit(){
    var token = sessionStorage.getItem('session_token')!;
    if(token == null){
      this.router.navigate(["/registro"]);
    } 
    
  }
  public cerrarSesion(){
    sessionStorage.removeItem('session_token');
    this.router.navigate(["/registro"])
  }

}
