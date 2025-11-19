import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private _snackBar = inject(MatSnackBar);

  constructor() { }

  showSnackBar(msg: string) {
    const snack = this._snackBar.open(msg, 'OK', {
      duration: 3000,
    });
  }

}
