import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { userInterface } from '@app/user/interface/user-interface';
import { UserHttpService } from '@app/user/user-services/user-http-service/user-http.service';
import { SpinnerService } from '@app/services/spinner/spinner.service';


@Component({
  selector: 'app-user-profile',
  imports: [MatCardModule, DatePipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {

  dataSource!: userInterface;

  private httpService = inject(UserHttpService);
  private spinnerService = inject(SpinnerService);

  constructor() {

    this.dataSource = {
      "id": "45b9",
      "personal_details": {
        "user_first_name": "Dummy",
        "user_last_name": "",
        "user_gender": "Dummy",
        "user_dob": "2025-11-20T19:00:00.000Z"
      },
      "contact_details": {
        "user_email_address": "Dummy",
        "user_phone": "Dummt",
        "user_address": "Dummy"
      }
    }
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.spinnerService.show();
    this.httpService.getUser("45b9").subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = res;
        console.log(this.dataSource);
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    })
  }

}
