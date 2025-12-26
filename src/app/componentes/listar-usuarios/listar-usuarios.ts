import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, UsuarioDTO } from '../../services/usuario';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, EditarUsuarioComponent],
  templateUrl: './listar-usuarios.html',
  styleUrls: ['./listar-usuarios.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: UsuarioDTO[] = [];
  cargando = true;
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    // Refresca la lista si se vuelve a esta ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/admin/pacientes') {
          this.cargarUsuarios();
        }
      });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.obtenerTodos().subscribe({
      next: data => {
        this.usuarios = data ?? [];
        this.cargando = false;
      },
      error: err => {
        console.error('ERROR API:', err);
        this.error = 'Error al cargar pacientes';
        this.cargando = false;
      }
    });
  }
usuarioSeleccionado: UsuarioDTO | null = null;

editar(usuario: UsuarioDTO) {
  this.usuarioSeleccionado = { ...usuario }; // abre modal
}

cancelarEdicion() {
  this.usuarioSeleccionado = null; // cierra modal
}

guardarUsuario(usuario: UsuarioDTO) {
  this.usuarioService.actualizar(usuario.idUsuario, usuario).subscribe({
    next: actualizado => {
      const index = this.usuarios.findIndex(u => u.idUsuario === actualizado.idUsuario);
      if (index !== -1) this.usuarios[index] = actualizado;
      this.usuarioSeleccionado = null;
    },
    error: () => alert('Error al actualizar paciente')
  });
}

  trackById(index: number, u: UsuarioDTO) {
    return u.idUsuario;
  }

}
