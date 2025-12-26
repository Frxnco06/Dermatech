import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { FooterComponent } from "../../componentes/footer/footer";

@Component({
  selector: 'app-detalle-cita',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './detalle-cita.html',
  styleUrls: ['./detalle-cita.css']
})
export class DetalleCitaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  public cita: any = null;
  public loading: boolean = true;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const email = this.authService.getUsuario();

    if (idParam && email) {
      this.cargarYFiltrarCita(Number(idParam), email);
    }
  }

  cargarYFiltrarCita(idCita: number, email: string): void {
    this.loading = true;
    // Usamos tu endpoint: /api/citas/paciente/email/{email}
    this.http.get<any[]>(`http://localhost:8080/api/citas/paciente/email/${email}`).subscribe({
      next: (data) => {
        // Buscamos la cita específica por ID dentro del listado del paciente
        const encontrada = data.find(c => c.idCita === idCita);
        
        if (encontrada) {
          this.cita = {
            ...encontrada,
            medicoNombre: encontrada.nombreMedico,
            estado: encontrada.nombreEstado,
            especialidad: encontrada.nombreEspecialidad || 'Dermatología General'
          };
        }
        this.loading = false;
        this.cdr.detectChanges(); // Forzamos el renderizado de los datos encontrados
      },
      error: (err) => {
        console.error('Error al recuperar datos:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getBadgeClass(estado: string): string {
    const s = (estado || '').toUpperCase();
    if (s.includes('PENDIENTE')) return 'bg-info-light text-white';
    if (s.includes('CONFIRMADA')) return 'bg-success';
    if (s.includes('CANCELADA')) return 'bg-danger';
    return 'bg-secondary';
  }
}