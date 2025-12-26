import { Routes } from '@angular/router';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios';
import { LoginComponent } from './componentes/login/login';
import { RegisterComponent } from './componentes/register/register';
import { AdminLayoutComponent } from './componentes/admin-layout/admin-layout';
import { InicioComponent } from './componentes/inicio/inicio';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita'; 
import { MisCitasComponent } from './components/mis-citas/mis-citas'; 
import { DetalleCitaComponent } from './componentes/detalle-cita/detalle-cita'; 
import { ProductosListComponent } from './componentes/productos-list/productos-list';

// Importación del nuevo componente generado para listar citas como administrador
import { ListarCitasComponent } from './componentes/admin/listar-citas/listar-citas';

export const routes: Routes = [
  // --- RUTAS PÚBLICAS Y DE CLIENTE ---
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegisterComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'mis-citas', component: MisCitasComponent },
  
  // Ruta para ver el detalle de una cita específica mediante su ID
  { path: 'detalle-cita/:id', component: DetalleCitaComponent },
  
  // --- RUTA DE ADMINISTRACIÓN (PANEL DE CONTROL) ---
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // Gestión de Pacientes/Usuarios
      { path: 'pacientes', component: ListarUsuariosComponent },
      { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
      
      // Gestión de Inventario/Productos
      { path: 'productos', component: ProductosListComponent },

      // NUEVO: Gestión Global de Citas para el Administrador
      { path: 'citas', component: ListarCitasComponent },
      
      // Redirección interna: Al entrar a /admin, carga por defecto la lista de pacientes
      { path: '', redirectTo: 'pacientes', pathMatch: 'full' }
    ]
  },

  // --- COMODÍN PARA RUTAS NO ENCONTRADAS ---
  { path: '**', redirectTo: '' }
];