import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ZapatillaService } from '../../services/zapatilla.service'; // Ajusta ruta
import { Zapatilla } from '../../models/zapatilla.model'; // Ajusta ruta
import { ProductoDetalleComponent } from '../../components/producto-detalle/producto-detalle.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  private zapatillaService = inject(ZapatillaService);
  readonly dialog = inject(MatDialog);

  zapatillas: Zapatilla[] = [];
  loading = true;

  showMobileFilters = false;

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.loading = true;
    this.zapatillaService.getAll().subscribe({
      next: (data) => {
        this.zapatillas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  openDialog(zapatilla: Zapatilla): void {
    this.dialog.open(ProductoDetalleComponent, {
      width: '1000px',

      // 2. En móviles ocupa todo el ancho disponible
      maxWidth: '100vw',

      // 3. Altura automática pero con límite para que no se salga de la pantalla
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container', // Opcional para estilos globales
      data: zapatilla // Pasamos la zapatilla completa con sus variaciones
    });
  }

  // --- HELPERS PARA LA VISTA --- //

  // Obtiene la imagen de la primera variación o un placeholder
  getDisplayImage(zap: Zapatilla): string {
    if (zap.variaciones && zap.variaciones.length > 0) {
      // Busca la primera que tenga imagen
      const v = zap.variaciones.find(v => v.imageUrl);
      return v ? v.imageUrl! : '/assets/images/placeholder.png';
    }
    return '/assets/images/placeholder.png';
  }

  // Obtiene el precio (o un rango)
  getDisplayPrice(zap: Zapatilla): number {
    if (zap.variaciones && zap.variaciones.length > 0) {
      return zap.variaciones[0].precio;
    }
    return 0;
  }
}