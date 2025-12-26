// src/app/componentes/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface UsuarioCreateDTO {
  nombreCompleto: string;
  email: string;
  contrasenia: string;
  telefono: string;
  dni: string;
  direccion: string;
  fechaNacimiento: string;
  idRol: number;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  usuario: UsuarioCreateDTO = {
    nombreCompleto: '',
    email: '',
    contrasenia: '',
    telefono: '',
    dni: '',
    direccion: '',
    fechaNacimiento: '',
    idRol: 1 //Paciente por defecto
  };

  confirmarContrasenia: string = '';
  isLoading: boolean = false;
  errors: { [key: string]: string } = {};

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  clearError(field: string): void {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    // Validar nombre completo
    if (!this.usuario.nombreCompleto || this.usuario.nombreCompleto.trim().length === 0) {
      this.errors['nombreCompleto'] = 'El nombre completo es obligatorio';
      isValid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.usuario.email || !emailRegex.test(this.usuario.email)) {
      this.errors['email'] = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    // Validar DNI
    if (!this.usuario.dni || this.usuario.dni.length !== 8) {
      this.errors['dni'] = 'El DNI debe tener 8 dígitos';
      isValid = false;
    }

    // Validar teléfono
    if (!this.usuario.telefono || this.usuario.telefono.length < 9) {
      this.errors['telefono'] = 'Ingrese un teléfono válido';
      isValid = false;
    }

    // Validar dirección
    if (!this.usuario.direccion || this.usuario.direccion.trim().length === 0) {
      this.errors['direccion'] = 'La dirección es obligatoria';
      isValid = false;
    }

    // Validar fecha de nacimiento
    if (!this.usuario.fechaNacimiento) {
      this.errors['fechaNacimiento'] = 'La fecha de nacimiento es obligatoria';
      isValid = false;
    }

    // Validar contraseña
    if (!this.usuario.contrasenia || this.usuario.contrasenia.length < 6) {
      this.errors['contrasenia'] = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    // Validar confirmación de contraseña
    if (this.usuario.contrasenia !== this.confirmarContrasenia) {
      this.errors['confirmarContrasenia'] = 'Las contraseñas no coinciden';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    this.http.post(`${this.apiUrl}/registrar`, this.usuario).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Respuesta del servidor:', response);
        this.showSuccessAlert();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error completo:', error);
        
        let errorMessage = 'Error al registrar usuario. Intente nuevamente.';
        
        // Manejar diferentes tipos de respuestas de error
        if (error.status === 400) {
          // BAD_REQUEST - Error de validación
          errorMessage = error.error?.error || error.error?.message || 'Datos inválidos. Verifique los campos.';
        } else if (error.status === 500) {
          // INTERNAL_SERVER_ERROR
          errorMessage = error.error?.error || 'Error en el servidor. Intente más tarde.';
        } else if (error.status === 0) {
          // No hay conexión con el servidor
          errorMessage = 'No se pudo conectar con el servidor. Verifique que el backend esté funcionando.';
        } else if (typeof error.error === 'string') {
          // Si el error viene como string directo
          errorMessage = error.error;
        }
        
        this.showErrorAlert(errorMessage);
      }
    });
  }

  showSuccessAlert(): void {
    if ((window as any).Swal) {
      (window as any).Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada correctamente.',
        confirmButtonColor: '#00a896',
        confirmButtonText: 'Iniciar sesión'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    } else {
      alert('¡Registro exitoso!');
      this.router.navigate(['/login']);
    }
  }

  showErrorAlert(message: string): void {
    if ((window as any).Swal) {
      (window as any).Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#dc3545'
      });
    } else {
      alert('Error: ' + message);
    }
  }
}