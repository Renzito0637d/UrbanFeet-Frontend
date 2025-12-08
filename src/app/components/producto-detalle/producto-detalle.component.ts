import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Zapatilla, ZapatillaVariacion } from '../../models/zapatilla.model';
import { toast } from 'ngx-sonner';

interface ColorGroup {
  colorName: string;
  imageUrl: string;
  variaciones: ZapatillaVariacion[]; // Todas las tallas de este color
}

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ProductoDetalleComponent>);
  public data: Zapatilla = inject(MAT_DIALOG_DATA); // Recibimos la zapatilla

  // Estado de la UI
  coloresUnicos: ColorGroup[] = [];
  colorSeleccionado: ColorGroup | null = null;
  tallaSeleccionada: ZapatillaVariacion | null = null;

  imagenActual: string = '';
  precioActual: number = 0;

  ngOnInit(): void {
    if (this.data && this.data.variaciones) {
      this.procesarVariaciones(this.data.variaciones);
    }
  }

  // Agrupa la lista plana de variaciones por Color
  procesarVariaciones(variaciones: ZapatillaVariacion[]) {
    const mapa = new Map<string, ColorGroup>();

    variaciones.forEach(v => {
      if (!mapa.has(v.color)) {
        mapa.set(v.color, {
          colorName: v.color,
          imageUrl: v.imageUrl || '/assets/images/placeholder.png',
          variaciones: []
        });
      }
      mapa.get(v.color)?.variaciones.push(v);
    });

    this.coloresUnicos = Array.from(mapa.values());

    // Seleccionar el primer color por defecto
    if (this.coloresUnicos.length > 0) {
      this.selectColor(this.coloresUnicos[0]);
    }
  }

  selectColor(grupo: ColorGroup) {
    this.colorSeleccionado = grupo;
    this.imagenActual = grupo.imageUrl;
    // Resetear talla al cambiar color
    this.tallaSeleccionada = null;
    // Precio base (puede cambiar según talla si tu negocio lo dicta, aquí tomo el primero)
    this.precioActual = grupo.variaciones[0].precio;
  }

  selectTalla(variacion: ZapatillaVariacion) {
    if (variacion.stock > 0) {
      this.tallaSeleccionada = variacion;
      this.precioActual = variacion.precio; // Actualizar precio por si varía por talla
    }
  }

  addToCart() {
    if (!this.tallaSeleccionada) {
      toast.warning('Por favor, selecciona una talla.');
      return;
    }

    console.log('Agregando al carrito:', {
      producto: this.data.nombre,
      variacionId: this.tallaSeleccionada.id,
      color: this.tallaSeleccionada.color,
      talla: this.tallaSeleccionada.talla
    });

    toast.success('Producto agregado al carrito');
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  getColorStyle(colorName: string): any {
    if (!colorName) return {};

    // Normalizamos para comparar (ignorar mayúsculas)
    const color = colorName.toLowerCase();

    switch (color) {
      case 'negro':
        return { backgroundColor: '#171717' }; // neutral-900
      case 'blanco':
        return { backgroundColor: '#ffffff' };
      case 'rojo':
        return { backgroundColor: '#ef4444' }; // red-500
      case 'azul':
        return { backgroundColor: '#3b82f6' }; // blue-500
      case 'verde':
        return { backgroundColor: '#22c55e' }; // green-500
      case 'amarillo':
        return { backgroundColor: '#eab308' }; // yellow-500
      case 'otros':
        // Círculo multicolor (Arcoiris)
        return {
          background: 'conic-gradient(red, orange, yellow, green, blue, indigo, violet, red)'
        };
      default:
        // Si no coincide, intentamos usar el valor tal cual (por si guardaste un Hex)
        return { backgroundColor: colorName };
    }
  }
}