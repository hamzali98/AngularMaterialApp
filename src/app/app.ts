import { Component, inject, signal } from '@angular/core';
import { SidenavComponent } from './side-nav/side-nav.component';
import { SpinnerService } from './services/spinner/spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [
    SidenavComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('material-app');

  spinnerService = inject(SpinnerService);


}
