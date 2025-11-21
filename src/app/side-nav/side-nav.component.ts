import { AfterViewInit, Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  Router,
  RouterLinkActive
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { DataServiceService } from '@app/user/user-services/user-profile-data-service/data-service.service';
// import { AuthService } from '@app/authentication/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSlideToggleModule,
    MatCardModule
  ]
})
export class SidenavComponent implements OnInit, AfterViewInit {

  userName = signal("");

  private breakpointObserver = inject(BreakpointObserver);
  private routerRef = inject(Router);
  private dataService = inject(DataServiceService);
  // private authService = inject(AuthService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.dataService.getUserData().subscribe({
      next: (val) => {
        if (val) {
          this.userName.set(val.personal_details.user_first_name);
        }
      }
    });
  }

  onClick() {
    this.routerRef.navigate(['profile']);
  }

  onLogout(){
    this.dataService.setLogout();
    this.routerRef.navigate(['']);

  }
}
