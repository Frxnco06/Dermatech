import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  contrasenia = '';
  errorMessage = '';

  constructor(
    private authService: AuthService
  ) {}

  onLogin() {
    this.authService.login(this.email, this.contrasenia)
      .subscribe({
        next: () => {
          this.errorMessage = '';
          this.authService.redirectByRole();
        },
        error: () => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      });
  }
}
