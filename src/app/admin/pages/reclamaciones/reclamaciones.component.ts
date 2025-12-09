import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReclamoService } from '../../../services/reclamo.service';
import { Reclamo } from '../../../models/reclamo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reclamaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './reclamaciones.component.html',
  styleUrl: './reclamaciones.component.css'
})
export class ReclamacionesComponent implements OnInit {

  reclamos: Reclamo[] = [];
  filtroEstado: string = "Todos";
  filtroTipo: string = "Todos";

  constructor(private reclamoService: ReclamoService) {}

  ngOnInit() {
    this.cargarReclamos();
  }

  cargarReclamos() {
    this.reclamos = this.reclamoService.filtrar(this.filtroEstado, this.filtroTipo);
  }

  aplicarFiltro() {
    this.cargarReclamos();
  }

  eliminar(id: number) {
    this.reclamoService.eliminar(id);
    this.cargarReclamos();
  }

  cambiarEstado(id: number, estado: string) {
    this.reclamoService.cambiarEstado(id, estado);
    this.cargarReclamos();
  }
}