import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

type RangeKey = '7d' | '30d' | 'ytd';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  // Datos base (conectar al api despues, spring)
  labels: (string | number)[] = [];
  data: number[] = [];

  // Paleta (claro/oscuro)
  palette = {
    line: '#06b6d4',
    area: 'rgba(6,182,212,0.25)',
    grid: '#e5e7eb',
    ticks: '#404040',
  };

  // Escena SVG (coordenadas internas)
  readonly W = 100;         // ancho viewBox
  readonly H = 60;          // alto viewBox
  readonly chart = {        // área útil del gráfico
    left: 8,
    right: 98,
    top: 6,
    bottom: 52
  };

  // Render output
  linePath = '';
  areaPath = '';
  points: { x: number, y: number }[] = [];
  gridYs: number[] = [];
  xLabelsLimited: { x: number, label: string | number }[] = [];

  ngOnInit(): void {
    this.updateThemePalette();
    this.setRange('7d'); // primer render
  }

  // Cambia rango (simula fetch)
  setRange(range: RangeKey) {
    if (range === '7d') {
      this.labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
      this.data = [320, 410, 380, 512, 460, 540, 600];
    } else if (range === '30d') {
      this.labels = Array.from({ length: 30 }, (_, i) => i + 1);
      this.data = Array.from({ length: 30 }, () => 300 + Math.round(Math.random() * 400));
    } else { // ytd
      this.labels = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
      this.data = [4, 5, 6, 8, 6, 9, 10, 9, 8, 11, 12, 13].map(v => v * 300);
    }

    this.updateThemePalette(); // por si el usuario cambió el tema
    this.computeChart();
  }

  // Si usas <html class="dark">, detectamos y ajustamos colores
  private updateThemePalette() {
    const isDark =
      document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark');

    this.palette = isDark ? {
      line: '#67e8f9',                         // cyan-300
      area: 'rgba(103,232,249,0.25)',
      grid: '#3f3f46',                         // neutral-700
      ticks: '#d4d4d8',                        // neutral-300
    } : {
      line: '#06b6d4',                         // cyan-500
      area: 'rgba(6,182,212,0.25)',
      grid: '#e5e7eb',                         // neutral-200
      ticks: '#404040',                        // neutral-700
    };
  }

  private computeChart() {
    const { left, right, top, bottom } = this.chart;
    const innerW = right - left;
    const innerH = bottom - top;

    // escalas
    const maxY = Math.max(...this.data) || 1;
    const minY = Math.min(...this.data) || 0;
    // margen superior/inferior
    const pad = (maxY - minY) * 0.1 || 10;
    const yMax = maxY + pad;
    const yMin = Math.max(0, minY - pad);

    const n = this.data.length;
    const stepX = n > 1 ? innerW / (n - 1) : 0;

    const x = (i: number) => left + i * stepX;
    const y = (val: number) => {
      const t = (val - yMin) / (yMax - yMin || 1);
      return bottom - t * innerH;
    };

    // puntos
    this.points = this.data.map((v, i) => ({ x: x(i), y: y(v) }));

    // path línea
    this.linePath = this.points.reduce((d, p, i) => {
      return d + (i === 0 ? `M ${p.x},${p.y}` : ` L ${p.x},${p.y}`);
    }, '');

    // path área (cierra hacia el eje X)
    if (this.points.length) {
      const first = this.points[0];
      const last = this.points[this.points.length - 1];
      this.areaPath = `${this.linePath} L ${last.x},${bottom} L ${first.x},${bottom} Z`;
    } else {
      this.areaPath = '';
    }

    // grid Y (3 líneas equiespaciadas dentro del área útil)
    this.gridYs = [top + innerH * 0.25, top + innerH * 0.5, top + innerH * 0.75];

    // labels X: limitar a ~10 para evitar saturación
    const maxLabels = 10;
    const stride = Math.ceil(n / maxLabels) || 1;
    this.xLabelsLimited = this.labels.map((lab, i) => ({ x: x(i), label: lab }))
      .filter((_, i) => i % stride === 0);
  }
}
