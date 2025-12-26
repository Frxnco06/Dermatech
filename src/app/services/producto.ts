// src/app/services/producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface ProductoDTO {
  idProducto?: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  sku: string;
  activo: boolean;
  idCategoria: number;
  nombreCategoria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  obtenerTodos(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  obtenerPorId(id: number): Observable<ProductoDTO> {
    return this.http.get<ProductoDTO>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  crear(producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.post<ProductoDTO>(
      `${this.apiUrl}/guardar`,
      producto,
      { headers: this.getHeaders() }
    );
  }

  actualizar(id: number, producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.put<ProductoDTO>(
      `${this.apiUrl}/${id}`,
      producto,
      { headers: this.getHeaders() }
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
