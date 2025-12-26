import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../side-bar/side-bar";
import { AuthService } from '../../services/auth'; // Asegúrate de la ruta

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'] 
})
export class AdminLayoutComponent {
  constructor(public auth: AuthService) {}

  cerrarSesion() {
    this.auth.logout();
  }
}