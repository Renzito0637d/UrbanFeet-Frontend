import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { RedesComponent } from './pages/redes/redes.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { ReclamosComponent } from './pages/reclamos/reclamos.component';
import { MispedidosComponent } from './pages/mispedidos/mispedidos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { LayoutClienteComponent } from './components/layout-cliente/layout-cliente.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutClienteComponent,
    children: [
      { path: '', component: InicioComponent, pathMatch: 'full' },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'redes', component: RedesComponent },
      { path: 'contactanos', component: ContactanosComponent },
      { path: 'reclamos', component: ReclamosComponent },
      { path: 'pedidos', component: MispedidosComponent },
      { path: 'carrito', component: CarritoComponent },
      // agrega aquí más páginas públicas: catalogo, contactanos, etc.
    ]
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { path: '**', redirectTo: '' },
];
