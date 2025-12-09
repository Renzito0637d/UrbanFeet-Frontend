import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SugerenciaService } from '../../../services/sugerencia.service';
import { SugerenciaResponse, SugerenciaRequest } from '../../../models/sugerencia.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sugerenncias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sugerenncias.component.html',
  styleUrls: ['./sugerenncias.component.css']
})
export class SugerennciasComponent implements OnInit {

  sugerencias: SugerenciaResponse[] = [];
  loading = false;

  mostrarModal = false;
  nuevoAsunto = '';
  nuevoMensaje = '';

  editId: number | null = null;
  editAsunto = '';
  editMensaje = '';

  estados = ['pendiente', 'revisado', 'resuelto', 'descartado'];

  constructor(
    private svc: SugerenciaService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.loading = true;

    this.svc.listar().subscribe({
      next: (r) => {
        this.sugerencias = r;
        this.loading = false;
        this.cd.detectChanges(); // 🔥 evita quedarse en “Cargando”
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Error al cargar sugerencias');
      }
    });
  }

  // Modal
  abrirModal() { this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; }

  // Crear
  crearSugerencia() {
    if (!this.nuevoAsunto.trim() || !this.nuevoMensaje.trim()) {
      this.toastr.warning('Todos los campos son obligatorios');
      return;
    }

    const req: SugerenciaRequest = {
      asunto: this.nuevoAsunto,
      mensaje: this.nuevoMensaje
    };

    this.svc.crear(req).subscribe({
      next: (r) => {
        this.sugerencias.unshift(r);
        this.toastr.success('Sugerencia creada');
        this.cerrarModal();
        this.cd.detectChanges(); // 🔥 refresca al instante
      },
      error: () => this.toastr.error('Error al crear sugerencia')
    });
  }

  // Editar
  iniciarEdicion(s: SugerenciaResponse) {
    this.editId = s.id;
    this.editAsunto = s.asunto;
    this.editMensaje = s.mensaje;
  }

  cancelarEdicion() { this.editId = null; }

  guardarEdicion(id: number) {
    if (!this.editAsunto.trim() || !this.editMensaje.trim()) {
      this.toastr.warning('Campos incompletos');
      return;
    }

    const req: SugerenciaRequest = {
      asunto: this.editAsunto,
      mensaje: this.editMensaje
    };

    this.svc.actualizar(id, req).subscribe({
      next: (r) => {
        const i = this.sugerencias.findIndex(x => x.id === id);
        if (i >= 0) this.sugerencias[i] = r;

        this.toastr.success('Actualizado');
        this.editId = null;
        this.cd.detectChanges();
      },
      error: () => this.toastr.error('Error al actualizar')
    });
  }

  // Eliminar
  eliminar(id: number) {
    if (!confirm('¿Eliminar sugerencia?')) return;

    this.svc.eliminar(id).subscribe({
      next: () => {
        this.sugerencias = this.sugerencias.filter(x => x.id !== id);
        this.toastr.success('Eliminado');
        this.cd.detectChanges();
      },
      error: () => this.toastr.error('Error al eliminar')
    });
  }

  // Estado local
  cambiarEstadoLocal(s: SugerenciaResponse, nuevo: string) {
    s.estado = nuevo;
    this.toastr.info('Estado cambiado localmente (sin guardar)');
  }
}
