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

  onEdit(arg0: userInterface) {
    throw new Error('Method not implemented.');
  }

}
