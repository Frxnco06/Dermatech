import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-login.html',
  styleUrls: ['./header-login.css']
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}

  cerrarSesion() {
    this.auth.logout();
  }
}
