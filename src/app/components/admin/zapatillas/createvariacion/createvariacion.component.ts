import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { toast } from 'ngx-sonner';
import { Observable } from 'rxjs';
import { VariacionesService } from '../../../../services/variaciones.service';

@Component({
  selector: 'app-createvariacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './createvariacion.component.html'
})
export class CreatevariacionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private variacionService = inject(VariacionesService);
  public dialogRef = inject(MatDialogRef<CreatevariacionComponent>);

  // DATA INYECTADA
  // Para CREAR: { zapatillaId: 10 }
  // Para EDITAR: { id: 5, color: 'Rojo', ... }
  public data = inject(MAT_DIALOG_DATA);

  loading = false;
  isEditMode = false;

  form: FormGroup = this.fb.group({
    color: ['', [Validators.required]],
    talla: ['', [Validators.required]],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [''] // Opcional
  });

  ngOnInit(): void {
    // Si tiene ID, es una edición de una variación existente
    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }
  }

  // Helper visual para errores
  isInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const requestData = this.form.value;

    let request$: Observable<any>;

    if (this.isEditMode) {
      // ACTUALIZAR (Necesitamos agregar este método al servicio si no está)
      request$ = this.variacionService.update(this.data.id, requestData);
    } else {
      // CREAR (Necesitamos el ID del padre que viene en data.zapatillaId)
      if (!this.data.zapatillaId) {
        toast.error('Error: No se identificó la zapatilla padre');
        this.loading = false;
        return;
      }
      request$ = this.variacionService.create(this.data.zapatillaId, requestData);
    }

    request$.subscribe({
      next: () => {
        toast.success(this.isEditMode ? 'Variación actualizada' : 'Variación agregada');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        toast.error('Ocurrió un error al guardar');
        this.loading = false;
      }
    });
  }
}