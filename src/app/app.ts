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
    console.log("Calling app.ts")
    if (this.serviceCenter.authCheck()){
      console.log(" calling app.ts function")
      this.serviceCenter.getLoggedUserFunc();
    }
  }

  ngOnInit(): void {
    // this.serviceCenter.getUserLoginFunc();
  }

}
