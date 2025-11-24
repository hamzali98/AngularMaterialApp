import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { ThemeService } from './theme.service';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button matIconButton (click)="theme.toggleTheme()">
      <mat-icon>
        @if(isDark()) { dark_mode } @else { light_mode }
      </mat-icon>
    </button>
  `,
})
export class ThemeToggleComponent {
  theme = inject(ThemeService);

  isDark = computed(() => this.theme.theme() === 'dark');
}
