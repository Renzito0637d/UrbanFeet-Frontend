import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemetoggleComponent } from '../themetoggle/themetoggle.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ThemetoggleComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }
}
