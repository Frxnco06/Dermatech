import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
// Asegúrate de que los nombres de las clases coincidan con tus archivos .ts
import { HeaderComponent as HeaderPrincipal } from './componentes/header/header'; 
import { AuthService } from './services/auth';
// Cambiamos el nombre de la clase a HeaderComponent si ese es el nombre dentro del archivo
import { HeaderComponent as HeaderLogin } from "./componentes/header-login/header-login";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderPrincipal, CommonModule, HeaderLogin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthService);
  // Asegúrate de que el observable esté correctamente inicializado desde el servicio
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;

  constructor() {}
}