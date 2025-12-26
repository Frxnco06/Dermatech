import { Routes } from '@angular/router';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios';
import { LoginComponent } from './componentes/login/login';
import { RegisterComponent } from './componentes/register/register';
import { AdminLayoutComponent } from './componentes/admin-layout/admin-layout';
import { InicioComponent } from './componentes/inicio/inicio';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita'; 
import { MisCitasComponent } from './components/mis-citas/mis-citas'; 
// 1. Importa el nuevo componente de detalle
import { DetalleCitaComponent } from './componentes/detalle-cita/detalle-cita'; 

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegisterComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'mis-citas', component: MisCitasComponent },
  
  // 2. Agregamos la ruta con el parámetro :id para el detalle
  { path: 'detalle-cita/:id', component: DetalleCitaComponent },
  
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'pacientes', component: ListarUsuariosComponent },
      { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
      { path: '', redirectTo: 'pacientes', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '' }
];