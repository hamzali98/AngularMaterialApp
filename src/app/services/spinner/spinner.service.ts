import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loader = signal(false);

  constructor() { }

  show() {
    this.loader.set(true);
  }

  hide() {
    setTimeout(() => {
      this.loader.set(false);
    }, 1200);
    // this.loader.set(false);
  }

  get() {
    return this.loader();
  }

}
