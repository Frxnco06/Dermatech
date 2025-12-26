import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiService } from '../../services/ui-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.css']
})
export class SidebarComponent {
  constructor(public uiService: UiService) {}
  onAgregarProducto() {
    this.uiService.dispararAbrirModal();
  }
  // Variables para controlar qué menú está abierto
  pacientesOpen: boolean = false;
  
  citasOpen: boolean = false;
  productosOpen: boolean = false; // ESTA ES LA QUE TE FALTABA

  togglePacientes() {
    this.pacientesOpen = !this.pacientesOpen;
    if (this.pacientesOpen) {
      this.citasOpen = false;
      this.productosOpen = false;
    }
  }

  toggleCitas() {
    this.citasOpen = !this.citasOpen;
    if (this.citasOpen) {
      this.pacientesOpen = false;
      this.productosOpen = false;
    }
  }

  // ESTA FUNCIÓN ES LA QUE TE FALTABA
  toggleProductos() {
    this.productosOpen = !this.productosOpen;
    if (this.productosOpen) {
      this.pacientesOpen = false;
      this.citasOpen = false;
    }
  }
}