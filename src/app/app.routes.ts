import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { RedesComponent } from './pages/redes/redes.component';

export const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'redes', component: RedesComponent },
  { path: '**', redirectTo: '' }
];
