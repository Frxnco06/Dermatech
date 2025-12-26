import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-principal', // Asegúrate de que este sea el selector que usas
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  nombreAMostrar: string | null = null;
  mostrarHeader: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1. Verificar ruta al cargar la página
    this.validarRuta(this.router.url);

    // 2. Escuchar cambios de ruta mientras navegas
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.validarRuta(event.urlAfterRedirects);
    });

    // 3. Suscribirse al usuario para el nombre
    this.authService.userEmail$.subscribe(email => {
      this.nombreAMostrar = email;
      this.cdr.detectChanges();
    });
  }

  private validarRuta(url: string) {
    // IMPORTANTE: Incluimos 'registrar-usuario' que es tu ruta real según la imagen
    const rutasOcultas = ['/login', '/registro', '/registrar-usuario'];
    this.mostrarHeader = !rutasOcultas.some(ruta => url.includes(ruta));
    this.cdr.detectChanges();
  }

  logout() {
    this.authService.logout();
  }
}