import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CitaCreateDTO {
  idPaciente: number;
  idMedico: number;
  fechaHora: string;
  motivoConsulta: string;
  observaciones?: string;
}

export interface CitaDTO {
  idCita: number;
  pacienteNombre: string;
  medicoNombre: string;
  nombreEstado: string;
  fechaHora: string;
  estado: string;         // Cambiado de nombreEstado a estado
  motivoConsulta: string;
  precio: number;         // Agregado para eliminar el error del HTML
}

@Injectable({ providedIn: 'root' })
export class CitaService {
  private apiUrl = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<CitaDTO[]> {
    return this.http.get<CitaDTO[]>(this.apiUrl);
  }

  listarPorPaciente(id: number): Observable<CitaDTO[]> {
    return this.http.get<CitaDTO[]>(`${this.apiUrl}/paciente/${id}`);
  }

  crear(dto: CitaCreateDTO): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  cancelar(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/cancelar`, {});
  }
}