import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CatalogoComponent } from '../../pages/catalogo/catalogo.component';

@Component({
  selector: 'app-producto-detalle',
  imports: [MatDialogModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent {
  readonly dialogRef = inject(MatDialogRef<CatalogoComponent>);

  onCancel() {
    this.dialogRef.close();
  }
}
