import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-header-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit { // Nombre de clase corregido
  nombreAMostrar: string | null = null;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // Usamos userEmail$ que es el que agregamos al AuthService
    this.authService.userEmail$.subscribe(email => {
      if (email) {
        this.usuarioService.obtenerTodos().subscribe(usuarios => {
          const user = usuarios.find(u => u.email === email);
          this.nombreAMostrar = user ? user.nombreCompleto : email;
        });
      } else {
        this.nombreAMostrar = null;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}