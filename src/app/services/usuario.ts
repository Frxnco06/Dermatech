import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequestDTO {
  email: string;
  contrasenia: string;
}

export interface UsuarioDTO {
  idUsuario: number;
  nombreCompleto: string;
  email: string;
  contrasenia: string;
  telefono: string;
  dni: string;
  direccion: string;
  fechaNacimiento: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  login(data: LoginRequestDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.baseUrl}/login`, data);
  }

  obtenerTodos(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.baseUrl);
  }
  
  actualizar(id: number, usuario: UsuarioDTO): Observable<UsuarioDTO> {
  return this.http.put<UsuarioDTO>(`${this.baseUrl}/${id}`, usuario);
}
  obtenerPorId(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.baseUrl}/${id}`);
  }

}
