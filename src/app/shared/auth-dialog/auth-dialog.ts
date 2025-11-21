import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-dialog',
  imports: [MatButtonModule],
  templateUrl: './auth-dialog.html',
  styleUrl: './auth-dialog.scss',
})
export class AuthDialog {

  private routerRef = inject(Router);
  private dialogRef = inject(MatDialog);

  goHome() {
    this.routerRef.navigate(['profile']);
    this.dialogRef.closeAll();
  }
}
