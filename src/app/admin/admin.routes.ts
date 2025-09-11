// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,       // layout (sidebar/topbar)
        children: [
            { path: '', component: InicioComponent, pathMatch: 'full' },
            { path: 'usuarios', component: UsuariosComponent},
        ]
    }
];
