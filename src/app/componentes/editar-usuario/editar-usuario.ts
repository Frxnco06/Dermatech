import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioDTO, UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.html',
  styleUrls: ['./editar-usuario.css']
})
export class EditarUsuarioComponent {

  @Input() usuario: UsuarioDTO | null = null;
  @Output() cancelar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<UsuarioDTO>();

  constructor(private usuarioService: UsuarioService) {}

  guardarCambios(): void {
    if (!this.usuario) return;
    this.guardar.emit(this.usuario);
  }

  cerrar(): void {
    this.cancelar.emit();
  }
}