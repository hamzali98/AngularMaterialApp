import { inject, Injectable, signal  } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

// constructor() { }

theme = signal<ThemeMode>('light');
overlay = inject(OverlayContainer);

  constructor() {
    const saved = localStorage.getItem('theme') as ThemeMode | null;
    if (saved) this.setTheme(saved);
    else this.applyTheme('light');
  }

  toggleTheme() {
    const mode = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(mode);
  }

  setTheme(mode: ThemeMode) {
    this.theme.set(mode);
    this.applyTheme(mode);
    localStorage.setItem('theme', mode);
  }

  private applyTheme(mode: ThemeMode) {
    const body = document.body;
    const overlayEl = this.overlay.getContainerElement();

    body.classList.toggle('light-theme', mode === 'light');
    body.classList.toggle('dark-theme', mode === 'dark');

    overlayEl.classList.toggle('light-theme', mode === 'light');
    overlayEl.classList.toggle('dark-theme', mode === 'dark');
  }

}
