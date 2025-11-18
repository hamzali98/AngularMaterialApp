import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { userInterface } from '@app/user/interface/user-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-user-view',
  imports: [MatCardModule, MatIcon, DatePipe, MatButtonModule, MatDialogModule],
  templateUrl: './user-view.html',
  styleUrl: './user-view.scss',
})
export class UserView {

  dataSource!: userInterface;

  // dataSource: userInterface = {
  //   "personal_details": {
  //     "user_first_name": "Hamza",
  //     "user_last_name": "Ali",
  //     "user_gender": "male",
  //     "user_dob": "2025-11-20T19:00:00.000Z"
  //   },
  //   "contact_details": {
  //     "user_email_address": "email@gmil.com",
  //     "user_phone": "68716654684",
  //     "user_address": "fully updated home address is here"
  //   },
  //   "id": "45b9"
  // }

  onEdit(arg0: userInterface) {
    throw new Error('Method not implemented.');
  }

}
