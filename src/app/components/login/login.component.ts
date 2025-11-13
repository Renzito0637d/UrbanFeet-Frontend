import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/auth.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly dialogRef = inject(MatDialogRef<HeaderComponent>);

  onCancel() {
    this.dialogRef.close();
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterComponent, {
      width: '700px',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // Inyectamos los servicios que necesitamos
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  // Creamos el formulario reactivo
  public loginForm: FormGroup = this.fb.group({
    // El primer string es el valor por defecto y validadores
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  // El método que se llama al enviar el formulario
  onSubmit(): void {

    // Creamos el DTO (Request) desde los valores del formulario
    const credentials: LoginRequest = this.loginForm.value;

    console.log('Llamando al servicio de login con credenciales:', credentials);
    this.authService.login(credentials).subscribe({
      // Manejamos el ÉXITO
      next: (user) => {
        // El login fue exitoso, 'user' es el objeto que devolvió el backend.
        // El servicio (AuthService) ya guardó el estado.
        // Ahora, redirigimos al usuario
        console.log('Login exitoso:', user);
        this.router.navigate(['/']);
      },
      // Manejamos el ERROR
      error: (err) => {
        // El login falló (ej. 401 Credenciales incorrectas)
        console.error('Error en el login:', err);
      }
    });

  }
}
