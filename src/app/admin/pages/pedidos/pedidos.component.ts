import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { PedidoService } from '../../../services/pedido.service';
import { PedidoResponse } from '../../../models/pedido.model';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {

  private pedidoService = inject(PedidoService);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);

  pedidos: PedidoResponse[] = [];

  // Control de edición: Guardamos el ID del pedido que se está editando
  editingId: number | null = null;

  // Copia temporal del pedido para editar (para no mutar el original hasta guardar)
  editBuffer: any = null;

  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.getAllAdmin().subscribe({
      next: (data) => {
        // Ordenamos por ID descendente (más nuevos primero)
        this.pedidos = data.sort((a, b) => b.id - a.id);

        // 3. FORZAR LA ACTUALIZACIÓN DE LA VISTA
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        toast.error('Error al cargar pedidos');
      }
    });
  }

  // --- Lógica de Edición ---

  activarEdicion(pedido: PedidoResponse) {
    this.editingId = pedido.id;
    // Clonamos profundamente el objeto para editar sin afectar la vista
    this.editBuffer = JSON.parse(JSON.stringify(pedido));
  }

  cancelarEdicion() {
    this.editingId = null;
    this.editBuffer = null;
  }

  guardarEdicion() {
    if (!this.editBuffer) return;

    if (this.isRepartidor && !this.isAdmin) { return; }

    const dto = {
      direccionId: this.editBuffer.direccionEnvio?.id || 1,
      metodoPago: this.editBuffer.metodoPago,
      estado: this.editBuffer.estado,

      detalles: this.editBuffer.detalles.map((d: any) => ({
        zapatillaVariacionId: d.zapatillaVariacionId,
        cantidad: d.cantidad,
        precioTotal: d.precioTotal
      }))
    };

    this.pedidoService.updatePedido(this.editBuffer.id, dto).subscribe({
      next: (pedidoActualizado) => { // El backend nos devuelve el pedido nuevo

        // 1. ACTUALIZACIÓN LOCAL (Sin recargar toda la lista)
        // Buscamos el pedido en nuestro array 'pedidos'
        const index = this.pedidos.findIndex(p => p.id === pedidoActualizado.id);

        if (index !== -1) {
          // Actualizamos sus propiedades directamente.
          // Al usar Object.assign, mantenemos la referencia y el acordeón NO SE CIERRA.
          Object.assign(this.pedidos[index], pedidoActualizado);
        }

        // 2. CERRAR MODO EDICIÓN
        this.editingId = null;
        this.editBuffer = null;

        // 3. FORZAR LA VISTA (Para que desaparezcan los inputs y aparezca el texto)
        this.cdr.detectChanges(); // O this.cdr.markForCheck();

        toast.success('Pedido actualizado correctamente');
      },
      error: (err) => {
        console.error(err);
        toast.error('No se pudo actualizar el pedido');
      }
    });
  }

  eliminarPedido(id: number) {
    if (!confirm('¿Eliminar este pedido permanentemente?')) return;

    this.pedidoService.deletePedido(id).subscribe({
      next: () => {
        toast.success('Pedido eliminado');
        this.cargarPedidos();
      },
      error: () => toast.error('Error al eliminar')
    });
  }

  // Helper para calcular total
  calcularTotal(pedido: any): number {
    if (!pedido.detalles) return 0;
    return pedido.detalles.reduce((acc: number, item: any) => acc + item.precioTotal, 0);
  }

  get isAdmin(): boolean {
    return this.authService.hasRoles(['ADMIN']);
  }

  get isRepartidor(): boolean {
    return this.authService.hasRoles(['PEDIDOS']);
    // O la lógica que uses para identificarlo
  }

  // Permite editar si tienes cualquiera de los dos roles
  get canEdit(): boolean {
    return this.isAdmin || this.isRepartidor;
  }
}