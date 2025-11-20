import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CenterService } from './services/servicecenter/center.service';
import { SidenavComponent } from './side-nav/side-nav.component';
import { Login } from './authentication/login/login';

@Component({
  selector: 'app-root',
  imports: [
    SidenavComponent,
    MatProgressSpinnerModule,
    Login
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  protected readonly title = signal('material-app');

  serviceCenter = inject(CenterService);
  private routerRef = inject(Router);

  constructor(){
    if (this.serviceCenter.authCheck()){
      // this.serviceCenter.getUserLoginFunc();
      this.serviceCenter.getLoggedUserFunc();
    }
  }

  ngOnInit(): void {
    // this.serviceCenter.getUserLoginFunc();
  }

}
