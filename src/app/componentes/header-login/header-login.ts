import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-login.html',
  styleUrls: ['./header-login.css'] // Asegúrate de importar el CSS que definimos antes
})
export class HeaderComponent implements OnInit {
  nombreAMostrar: string | null = null;
  mostrarHeader: boolean = true;

  constructor(
    public auth: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Detectar ruta actual para ocultar en login/registro
    this.evaluarRuta(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.evaluarRuta(event.urlAfterRedirects);
    });

    // Suscripción al nombre de usuario
    this.auth.userEmail$.subscribe(email => {
      this.nombreAMostrar = email;
      this.cdr.detectChanges();
    });
  }

  private evaluarRuta(url: string) {
    this.mostrarHeader = !(url.includes('/login') || url.includes('/registro'));
    this.cdr.detectChanges();
  }

  cerrarSesion() {
    this.auth.logout();
  }
}