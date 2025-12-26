import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../services/cita';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-citas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-citas.html',
  styleUrls: ['./listar-citas.css']
})
export class ListarCitasComponent implements OnInit {
  citas: any[] = [];
  cargando: boolean = true;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cargando = true;
    this.citaService.obtenerTodas().subscribe({
      next: (data) => {
        this.citas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener citas:', err);
        this.cargando = false;
      }
    });
  }

// ... resto del código igual

  // Método para cancelar usando el método del servicio
  cancelarCita(id: number): void {
    if (confirm('¿Desea cancelar esta cita de forma permanente?')) {
      // CAMBIO AQUÍ: Llamamos a .cancelar(id) en lugar de .cancelarCita(id)
      this.citaService.cancelar(id).subscribe({
        next: () => {
          this.cargarCitas(); // Refresca la lista
          alert('Cita cancelada con éxito');
        },
        error: (err) => {
          console.error('Error al cancelar:', err);
          alert('No se pudo cancelar la cita');
        }
      });
    }
  }
}