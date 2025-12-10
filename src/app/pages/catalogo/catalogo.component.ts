import { Component, inject } from '@angular/core';
import { ProductoDetalleComponent } from '../../components/producto-detalle/producto-detalle.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ProductoDetalleComponent, {
      width: '900px',     // o '80vw' para porcentaje
      maxWidth: '95vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
