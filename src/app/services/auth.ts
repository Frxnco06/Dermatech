import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  usuario: string;
  rol: string;
}

interface LoginRequest {
  email: string;
  contrasenia: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  private rolKey = 'auth_rol';
  
  // Observable para saber si el usuario está autenticado
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // --- LO QUE NECESITAMOS (AGREGADO SIN QUITAR NADA) ---
  // Este Subject emitirá el email guardado para que el Header lo capture
  private userEmailSubject = new BehaviorSubject<string | null>(localStorage.getItem('auth_user'));
  public userEmail$ = this.userEmailSubject.asObservable();
  // ---------------------------------------------------

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Realiza el login del usuario
   */
  login(email: string, contrasenia: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { email, contrasenia };
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          // Guardar el token y datos del usuario en localStorage
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, response.usuario);
          localStorage.setItem(this.rolKey, response.rol);
          this.isAuthenticatedSubject.next(true);

          // --- NOTIFICAR EL CAMBIO DE USUARIO ---
          this.userEmailSubject.next(response.usuario); 
          // --------------------------------------
        })
      );
  }

  /**
   * Cierra la sesión del usuario
   */
logout(): void {
  localStorage.removeItem(this.tokenKey);
  localStorage.removeItem(this.userKey);
  localStorage.removeItem(this.rolKey);
  // Esto es vital para que el app.html cambie al loginHeader
  this.isAuthenticatedSubject.next(false); 
  this.userEmailSubject.next(null);
  this.router.navigate(['/login']);
}

  /**
   * Obtiene el token JWT almacenado
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtiene el email del usuario autenticado
   */
  getUsuario(): string | null {
    return localStorage.getItem(this.userKey);
  }

  /**
   * Obtiene el rol del usuario autenticado
   */
  getRol(): string | null {
    return localStorage.getItem(this.rolKey);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /**
   * Verifica si existe un token en localStorage
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtiene los headers con el token de autenticación
   * Útil para peticiones HTTP que requieren autenticación
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    const userRole = this.getRol();
    return userRole === role;
  }

  /**
   * Verifica si el usuario tiene alguno de los roles especificados
   */
  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getRol();
    return userRole !== null && roles.includes(userRole);
  }

  redirectByRole(): void {
    const rol = this.getRol();

    if (rol === 'ADMIN') {
      this.router.navigate(['/admin']);
    }
    else if (rol === 'PACIENTE') {
      this.router.navigate(['']);
    } 
    else {
      this.router.navigate(['/']);
    }
  }
}