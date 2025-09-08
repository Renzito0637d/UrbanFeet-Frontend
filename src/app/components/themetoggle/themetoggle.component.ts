import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-themetoggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './themetoggle.component.html',
  styleUrl: './themetoggle.component.css'
})
export class ThemetoggleComponent implements OnInit {
  theme: 'light' | 'dark' = 'light';

  ngOnInit() {
    const saved = (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light';
    this.theme = saved;
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    this.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
  }
}