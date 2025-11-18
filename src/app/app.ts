import { Component, OnInit, inject, signal } from '@angular/core';
import { SidenavComponent } from './side-nav/side-nav.component';
import { SpinnerService } from './services/spinner/spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataServiceService } from './user/user-services/user-profile-data-service/data-service.service';
import { UserHttpService } from './user/user-services/user-http-service/user-http.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  imports: [
    SidenavComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('material-app');

  spinnerService = inject(SpinnerService);
  dataService = inject(DataServiceService);
  httpService = inject(UserHttpService);

ngOnInit(): void {
  this.getLogedUser();
  // this.dataService.setUserData();
}

getLogedUser(): void {
  this.spinnerService.show();
  this.httpService.getUser('45b9').subscribe({
    next: (value) => {
      console.log("Single user data", value);
      this.dataService.setUserData(value);
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => {
      this.spinnerService.hide();
    }
  });
}

}
