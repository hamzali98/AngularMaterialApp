import { AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { userInterface } from '@app/user/interface/user-interface';
import { UserHttpService } from '@app/user/user-services/user-http-service/user-http.service';
import { SpinnerService } from '@app/services/spinner/spinner.service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { DataServiceService } from '@app/user/user-services/user-profile-data-service/data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserForm } from '../user-form/user-form';
import { CenterService } from '@app/services/servicecenter/center.service';

@Component({
  selector: 'app-user-profile',
  imports: [MatCardModule, DatePipe, MatButtonModule, MatIconModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {

  dataSource!: userInterface;

  private matDialog = inject(MatDialog);
  spinnerService = inject(SpinnerService);
  private httpService = inject(UserHttpService);
  private dataService = inject(DataServiceService);
  // serviceCenter = inject(CenterService);

  constructor() { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    // this.spinnerService.show();
    this.dataService.getUserData().subscribe({
      next: (value) => {
        if (value) {
          console.log("Data in getting data service", value);
          this.dataSource = value;
        // this.spinnerService.hide();
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // this.spinnerService.hide();
      }
    });
  }

  onEdit(data: userInterface) {
    const dialogRef = this.matDialog.open(UserForm);
    dialogRef.componentInstance.userEditingData = data;
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getuserAfterEdit(data.id);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getuserAfterEdit(id: string) {
    this.spinnerService.show();
    this.httpService.getUser(id).subscribe({
      next: (res) => {
        this.dataService.setUserData(res);
        this.spinnerService.hide();

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getUserData();
        this.spinnerService.hide();
      }
    });
  }



}
