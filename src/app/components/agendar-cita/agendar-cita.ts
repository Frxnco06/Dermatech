import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaCreateDTO, CitaService } from '../../services/cita';
import { UsuarioService, UsuarioDTO } from '../../services/usuario';
import { MedicoService } from '../../services/medico';
import { AuthService } from '../../services/auth';
import Swal from 'sweetalert2';
import { FooterComponent } from "../../componentes/footer/footer";

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
 imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FooterComponent 
  ],
  templateUrl: './agendar-cita.html',
  styleUrls: ['./agendar-cita.css']
  
})

export class AgendarCitaComponent implements OnInit {
  citaForm!: FormGroup;
  usuarioInfo: UsuarioDTO | null = null;
  medicosActivos: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private usuarioService: UsuarioService,
    private medicoService: MedicoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarUsuarioLogueado();
    this.cargarMedicos();
  }

cargarUsuarioLogueado() {
  const emailStored = localStorage.getItem('auth_user'); 
  
  if (emailStored) {
    this.usuarioService.obtenerTodos().subscribe({
      next: (usuarios) => {
        const encontrado = usuarios.find(u => u.email === emailStored);
        if (encontrado) {
          this.usuarioInfo = encontrado;
          console.log('Usuario cargado con éxito:', this.usuarioInfo);
        } else {
          console.error('No se encontró el usuario en la base de datos');
        }
      },
      error: (err) => console.error('Error al conectar con el servidor:', err)
    });
  }
}

cargarMedicos() {
  this.medicoService.obtenerActivos().subscribe({
    next: (data) => {
      this.medicosActivos = data;
      console.log('Médicos listos para el dropdown:', this.medicosActivos);
    },
    error: (err) => console.error('Error al traer médicos:', err)
  });
}

  initForm() {
    this.citaForm = this.fb.group({
      idMedico: ['', Validators.required],
      fechaHora: ['', Validators.required],
      motivoConsulta: ['', [Validators.required, Validators.minLength(5)]],
      observaciones: ['']
    });
  }

onSubmit() {
  if (this.citaForm.valid && this.usuarioInfo) {
    // 1. Validar fecha futura para evitar el error "Cita en el pasado"
    const fechaSeleccionada = new Date(this.citaForm.value.fechaHora);
    const ahora = new Date();

    if (fechaSeleccionada <= ahora) {
      Swal.fire('Fecha inválida', 'La cita debe ser programada para una hora futura.', 'error');
      return;
    }

const payload = {
  idPaciente: this.usuarioInfo.idUsuario,
  idMedico: Number(this.citaForm.value.idMedico),
  fechaHora: this.citaForm.value.fechaHora + ":00", 
  motivoConsulta: this.citaForm.value.motivoConsulta,
  observaciones: this.citaForm.value.observaciones || "",
  idEstadoCita: 1 
};

    console.log('Enviando datos al servidor:', payload);

    // 3. Llamar al método crear del servicio
    this.citaService.crear(payload).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Cita agendada correctamente. El estado inicial es PENDIENTE.',
          icon: 'success',
          confirmButtonColor: '#20c997'
        });
        this.citaForm.reset();
      },
      error: (err) => {
        console.error('Error capturado:', err);
        // Aquí capturamos el mensaje "Estado de cita no encontrado" del backend
        const mensajeError = err.error?.message || err.error || 'Error al guardar la cita';
        Swal.fire('Error del Servidor', mensajeError, 'error');
      }
    });
  }
}
}