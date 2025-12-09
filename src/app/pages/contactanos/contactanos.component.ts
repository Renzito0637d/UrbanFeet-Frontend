import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SugerenciaService } from '../../services/sugerencia.service';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {

  asunto: string = "";
  mensaje: string = "";

  constructor(private sugerenciaService: SugerenciaService) {}

  enviarFormulario() {
    if (!this.asunto || !this.mensaje) {
      alert("Por favor complete el asunto y mensaje.");
      return;
    }

    this.sugerenciaService.crearSugerencia({
      asunto: this.asunto,
      mensaje: this.mensaje
    }).subscribe({
      next: () => {
        alert("Mensaje enviado correctamente");
        this.asunto = "";
        this.mensaje = "";
      },
      error: () => {
        alert("Ocurrió un error al enviar el mensaje");
      }
    });
  }
}
