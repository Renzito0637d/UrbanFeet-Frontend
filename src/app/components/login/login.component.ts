import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly dialogRef = inject(MatDialogRef<HeaderComponent>);

  onCancel() {
    this.dialogRef.close();
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterComponent, {
      width: '700px',
      height: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
