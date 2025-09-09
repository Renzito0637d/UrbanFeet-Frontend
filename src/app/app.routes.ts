import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';

export const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: '**', redirectTo: '' }
];
