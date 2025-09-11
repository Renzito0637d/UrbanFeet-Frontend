import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 importante FormsModule
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  filtros = {
    marca: '',
    genero: '',
    tipo: ''
  };

  productos = [
    {
      nombre: 'Zapatillas Nike Air',
      variaciones: [
        { color: 'Rojo', precio: 299.90, imageUrl: '/img/nike.png' },
        { color: 'Negro', precio: 299.90, imageUrl: '/img/nike.png' },
      ]
    },
    {
      nombre: 'Zapatillas Adidas Run',
      variaciones: [
        { color: 'Azul', precio: 259.90, imageUrl: '/img/adidas.png' },
      ]
    }
  ];

  limpiarFiltros() {
    this.filtros = { marca: '', genero: '', tipo: '' };
  }
}
