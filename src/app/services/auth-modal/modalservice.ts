import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '@app/shared/auth-dialog/auth-dialog';

@Injectable({
  providedIn: 'root',
})
export class Modalservice {
  
  private authDialog = inject(MatDialog);

  openUnauthorizedDialog(): void {
    this.authDialog.open(AuthDialog, {
      // width: '400px',
      // height: '200px',
      disableClose: true,
      panelClass: 'mat-dialog-container'
    });
  }


}
