import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importante para *ngIf
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SugerenciaService } from '../../services/sugerencia.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  // Agregamos MatDialogModule y CommonModule a los imports
  imports: [FormsModule, MatDialogModule, CommonModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent implements OnInit {

  // Variables simples para ngModel
  asunto: string = "";
  mensaje: string = "";

  // Variables para mostrar datos del usuario (opcional, solo visual)
  nombreUsuario: string = "";
  emailUsuario: string = "";
  estaLogueado: boolean = false;

  private dialog = inject(MatDialog);

  constructor(
    private sugerenciaService: SugerenciaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscribirse al estado del usuario
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.estaLogueado = true;
        this.nombreUsuario = user.nombre + ' ' + user.apellido; // Ajusta según tu modelo
        this.emailUsuario = user.email;
      } else {
        this.estaLogueado = false;
        this.nombreUsuario = "";
        this.emailUsuario = "";

        // REGLA: Si entra y no está logueado, abrir modal
        this.abrirLogin();
      }
    });
  }

  abrirLogin() {
    // Evita abrir multiples modales si ya hay uno
    if (this.dialog.openDialogs.length === 0) {
      this.dialog.open(LoginComponent, {
        width: '400px',
        disableClose: true
      });
    }
  }

  enviarFormulario() {
    // 1. Validación de seguridad
    if (!this.estaLogueado) {
      alert("Debes iniciar sesión para enviar un mensaje.");
      this.abrirLogin();
      return;
    }

    // 2. Validación de campos
    if (!this.asunto || !this.mensaje) {
      alert("Por favor complete el asunto y mensaje.");
      return;
    }

    // 3. Envío (Usando tu lógica original simple)
    // Nota: Si tu backend requiere nombre/correo en el body, agrégalos aquí.
    // Si el backend los saca del token, esto está perfecto.
    const payload = {
      asunto: this.asunto,
      mensaje: this.mensaje,
      // Si necesitas enviar quien lo manda explícitamente:
      // nombre: this.nombreUsuario,
      // correo: this.emailUsuario
    };

    this.sugerenciaService.crearSugerencia(payload).subscribe({
      next: () => {
        alert("Mensaje enviado correctamente");
        this.asunto = "";
        this.mensaje = "";
      },
      error: (err) => {
        console.error(err);
        alert("Ocurrió un error al enviar el mensaje");
      }
    });
  }
}
