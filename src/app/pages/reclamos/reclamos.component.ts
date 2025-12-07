import { Component } from '@angular/core';
import { ReclamoService } from '../../services/reclamo.service';
import { Reclamo } from '../../models/reclamo.model';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reclamos',
  imports: [FormsModule],
  templateUrl: './reclamos.component.html',
  styleUrl: './reclamos.component.css'
})
export class ReclamosComponent {

  enviado = false;

  constructor(private reclamoService: ReclamoService) {}

  enviar(form: NgForm) {
    if (form.invalid) return;

    const datos = form.form.value;

    const nuevo: Reclamo = {
      id: Date.now(),
      ...datos,
      fecha: new Date().toISOString()
    };

    this.reclamoService.agregarReclamo(nuevo);

    this.enviado = true;
    form.resetForm();
  }
}
