// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,       // layout (sidebar/topbar)
        children: [
            { path: '', component: InicioComponent, pathMatch: 'full' },
            { path: 'usuarios', component: UsuariosComponent},
            { path: 'catalogo', component: CatalogoComponent},
            { path: 'pedidos', component: PedidosComponent},
        ]
    }
];
