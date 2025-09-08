import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

export const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'nosotros', component: NosotrosComponent },
  { path: '**', redirectTo: '' }
];
