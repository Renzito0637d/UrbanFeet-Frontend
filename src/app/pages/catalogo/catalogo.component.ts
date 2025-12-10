import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ZapatillaService } from '../../services/zapatilla.service'; // Ajusta ruta
import { Zapatilla } from '../../models/zapatilla.model'; // Ajusta ruta
import { ProductoDetalleComponent } from '../../components/producto-detalle/producto-detalle.component';
import { MatIconModule } from '@angular/material/icon';
import { Page } from '../../models/page.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  private zapatillaService = inject(ZapatillaService);
  readonly dialog = inject(MatDialog);

  zapatillas: Zapatilla[] = [];
  loading = true;

  showMobileFilters = false;

  currentPage = 0;   // Página actual (empieza en 0)
  pageSize = 12;     // Productos por página
  totalPages = 0;
  totalElements = 0;
  isFirst = true;
  isLast = false;

  pageNumbers: number[] = [];

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.loading = true;

    this.zapatillaService.getPaginatedPublic(this.currentPage, this.pageSize).subscribe({
      next: (data: any) => { // <--- Usamos 'any' para acceder a data.page sin errores de tipo

        // 1. Llenamos la lista (El contenido sí suele venir en la raíz)
        this.zapatillas = data.content || [];

        // 2. CORRECCIÓN: Accedemos a los metadatos dentro de 'page'
        // Usamos ?. (optional chaining) por si acaso venga nulo
        const pageInfo = data.page;

        if (pageInfo) {
            this.totalPages = pageInfo.totalPages;
            this.totalElements = pageInfo.totalElements;
            
            // Calculamos si es primera o última manualmente basado en el número de página
            const currentNum = pageInfo.number || 0;
            this.isFirst = currentNum === 0;
            this.isLast = currentNum === (this.totalPages - 1);
        } else {
            // Fallback por si el backend cambia formato
            this.totalPages = 0;
        }

        // 3. Generamos los números para el HTML
        this.generarNumerosPagina();

        this.loading = false;
        
        // Scroll suave arriba
        if (this.currentPage > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      error: (err) => {
        console.error('Error al cargar catálogo:', err);
        this.loading = false;
      }
    });
  }

  cambiarPagina(pagina: number) {
    // Validaciones para no salirnos de los límites
    if (pagina < 0 || pagina >= this.totalPages || pagina === this.currentPage) {
      return;
    }
    this.currentPage = pagina;
    this.loadProductos(); // Recargamos con la nueva página
  }

  siguientePagina() {
    if (!this.isLast) {
      this.cambiarPagina(this.currentPage + 1);
    }
  }

  anteriorPagina() {
    if (!this.isFirst) {
      this.cambiarPagina(this.currentPage - 1);
    }
  }

  // Crea un array [0, 1, 2...] según el total de páginas
  generarNumerosPagina() {
    this.pageNumbers = Array(this.totalPages).fill(0).map((x, i) => i);
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