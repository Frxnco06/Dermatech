import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListarUsuariosComponent } from '../listar-usuarios/listar-usuarios';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ListarUsuariosComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  pacientesOpen = false;

  togglePacientes() {
    this.pacientesOpen = !this.pacientesOpen;
  }
}
