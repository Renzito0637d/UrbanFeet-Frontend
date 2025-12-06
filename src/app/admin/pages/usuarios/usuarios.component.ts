import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientesComponent } from '../../../components/admin/usuarios/clientes/clientes.component';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { toast } from 'ngx-sonner';
import { UsuariosInternosComponent } from '../../../components/admin/usuarios/usuariosinternos/usuariosinternos.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosComponent implements OnInit {

  internalUsers: User[] = [];
  internalPage: number = 0;
  internalTotalPages: number = 0;
  internalTotalElements: number = 0;

  // --- ESTADO CLIENTES ---
  clients: User[] = [];
  clientPage: number = 0;
  clientTotalPages: number = 0;
  clientTotalElements: number = 0;

  // Configuración general
  pageSize: number = 5;

  // Inyecciones
  private readonly dialog = inject(MatDialog);

  // 2. INYECTAR ChangeDetectorRef
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadInternalUsers();
    this.loadClients();
  }

  loadInternalUsers() {
    this.userService.getInternalUsers(this.internalPage, this.pageSize)
      .subscribe({
        next: (resp) => {
          this.internalUsers = resp.content;
          this.internalTotalPages = resp.totalPages;
          this.internalTotalElements = resp.totalElements;

          // 3. AVISAR A ANGULAR QUE HAY CAMBIOS
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Error cargando internos', err)
      });
  }

  changeInternalPage(delta: number) {
    const newPage = this.internalPage + delta;
    if (newPage >= 0 && newPage < this.internalTotalPages) {
      this.internalPage = newPage;
      this.loadInternalUsers();
    }
  }

  // ==========================================
  // LÓGICA CLIENTES
  // ==========================================
  loadClients() {
    this.userService.getClients(this.clientPage, this.pageSize)
      .subscribe({
        next: (resp) => {
          this.clients = resp.content;
          this.clientTotalPages = resp.totalPages;
          this.clientTotalElements = resp.totalElements;

          // 3. AVISAR A ANGULAR QUE HAY CAMBIOS
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Error cargando clientes', err)
      });
  }

  changeClientPage(delta: number) {
    const newPage = this.clientPage + delta;
    if (newPage >= 0 && newPage < this.clientTotalPages) {
      this.clientPage = newPage;
      this.loadClients();
    }
  }

  deleteUser(id: number | undefined, type: 'internal' | 'client') {
    // Validación de seguridad por si el ID es undefined
    if (id === undefined) return;

    // Confirmación nativa (simple y efectiva)
    if (confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {

      this.userService.deleteUser(id).subscribe({
        next: () => {
          // Mostrar éxito
          toast.success('Usuario eliminado correctamente');

          // Recargar SOLO la lista correspondiente
          if (type === 'internal') {
            this.loadInternalUsers();
          } else {
            this.loadClients();
          }
        },
        error: (err) => {
          console.error(err);
          // Mostrar error
          toast.error('Ocurrió un error al eliminar el usuario');
        }
      });
    }
  }

  // ==========================================
  // UTILS & MODALES
  // ==========================================

  formatRole(role: string): string {
    return role && role.replace ? role.replace('ROLE_', '') : role;
  }

  // --- MODALES (CREAR / EDITAR) ---

  // Acepta un usuario opcional 'userToEdit'
  openDialogClie(userToEdit?: User) {
    const dialogRef = this.dialog.open(ClientesComponent, {
      data: userToEdit // Si es undefined, el modal asumirá que es CREAR
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadClients(); // Recargar tabla al cerrar
      }
    });
  }

  // Acepta un usuario opcional 'userToEdit'
  openDialogFinales(userToEdit?: User) {
    const dialogRef = this.dialog.open(UsuariosInternosComponent, {
      data: userToEdit // Si es undefined, el modal asumirá que es CREAR
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadInternalUsers(); // Recargar tabla al cerrar
      }
    });
  }


}
