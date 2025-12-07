import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReclamoService } from '../../../services/reclamo.service';
import { Reclamo } from '../../../models/reclamo.model';

@Component({
  selector: 'app-reclamaciones',
  imports: [CommonModule, DatePipe],
  templateUrl: './reclamaciones.component.html',
  styleUrl: './reclamaciones.component.css'
})
export class ReclamacionesComponent implements OnInit {

  reclamos: Reclamo[] = [];

  constructor(private reclamoService: ReclamoService) {}

  ngOnInit() {
    this.reclamos = this.reclamoService.getReclamos();
  }

  eliminar(id: number) {
    this.reclamoService.eliminar(id);
    this.reclamos = this.reclamoService.getReclamos();
  }
}
