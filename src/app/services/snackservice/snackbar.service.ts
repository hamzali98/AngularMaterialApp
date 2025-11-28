import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';

export type SnackType = 'success' | 'error' | 'warning' | 'info' | 'simple';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private _snackBar = inject(MatSnackBar);

  constructor() { }

  // showSnackBar(msg: string) {
  //   const snack = this._snackBar.open(msg, 'OK', {
  //     duration: 3000,
  //   });
  // }

  private openSnack(message: string, action: string | undefined, config: MatSnackBarConfig) {
    this._snackBar.open(message, action, config);
  }

  success(message: string, action = 'Close', duration = 3000) {
    this.openSnack(message, action, {
      duration,
      panelClass: ['success-snackbar', 'snack-z-top']
    });
  }

  error(message: string, action = 'Close', duration = 3000) {
    this.openSnack(message, action, {
      duration,
      panelClass: ['error-snackbar']
    });
  }

  warning(message: string, action = 'Close', duration = 3000) {
    this.openSnack(message, action, {
      duration,
      panelClass: ['warning-snackbar']
    });
  }

  info(message: string, action = 'Close', duration = 3000) {
    this.openSnack(message, action, {
      duration,
      panelClass: ['info-snackbar']
    });
  }

  simple(message: string, action = 'Close', duration = 3000) {
    this.openSnack(message, action, {
      duration
    });
  }

}
