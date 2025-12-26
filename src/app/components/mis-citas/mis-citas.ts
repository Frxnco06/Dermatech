import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CitaDTO } from '../../services/cita';
import { AuthService } from '../../services/auth';
import { FooterComponent } from "../../componentes/footer/footer";

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.css']
})
export class MisCitasComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef); // Inyectado para forzar la carga

  public citas: CitaDTO[] = [];
  public loading: boolean = true;
  public nombreUsuarioLogueado: string = '';

  ngOnInit(): void {
    this.nombreUsuarioLogueado = this.authService.getUsuario() || '';
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    const email = this.authService.getUsuario();

    if (email) {
      this.http.get<any[]>(`http://localhost:8080/api/citas/paciente/email/${email}`).subscribe({
        next: (data) => {
          // Mapeo manteniendo tus nombres de variables de registro
          this.citas = data.map(item => ({
            ...item,
            medicoNombre: item.nombreMedico, 
            estado: item.nombreEstado,
            precio: item.precio || 0
          }));
          
          console.log('Citas mapeadas:', this.citas);
          this.loading = false;
          
          // ESTO SOLUCIONA EL ERROR DE CARGA: Fuerza a Angular a pintar el HTML ahora mismo
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error('Error al cargar:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  getBadgeClass(estado: string): string {
    const s = (estado || '').toUpperCase();
    if (s.includes('PENDIENTE')) return 'bg-info-light text-white'; // Celeste de tu referencia
    if (s.includes('CONFIRMADA')) return 'bg-success';
    if (s.includes('CANCELADA')) return 'bg-danger';
    return 'bg-secondary';
  }
}