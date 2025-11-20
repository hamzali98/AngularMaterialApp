import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserHttpService } from '@app/user/user-services/user-http-service/user-http.service';
import { SnackbarService } from '@app/services/snackservice/snackbar.service';
import { SpinnerService } from '@app/services/spinner/spinner.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsertableComponent } from '../user-table/user-table.component';
import { userInterface } from '@app/user/interface/user-interface';
import { CenterService } from '@app/services/servicecenter/center.service';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit {

  genders: Gender[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'others', viewValue: 'Others' },
  ];

  userForm: FormGroup;
  userEditingData!: userInterface;

  // private httpService = inject(UserHttpService);
  // private snackbarService = inject(SnackbarService);
  // private spinnerService = inject(SpinnerService);
  // private matdialogRef = inject(MatDialog);
  private serviceCenter = inject(CenterService);

  constructor() {
    this.userForm = new FormGroup({
      personal_details: new FormGroup({
        user_first_name: new FormControl('', Validators.required),
        user_last_name: new FormControl('', Validators.required),
        user_gender: new FormControl('', Validators.required),
        user_dob: new FormControl('', Validators.required),
      }),
      contact_details: new FormGroup({
        user_email_address: new FormControl('', [
          Validators.required,
          Validators.email,
          // Validators.pattern(/^[a-zA-Z0-9._%+-_]+@[a-z0-9.-]+\.{2,4}$/)
        ]),
        user_phone: new FormControl('', Validators.required),
        user_address: new FormControl('', Validators.required),
      }),
    });
    this.userForm.markAllAsTouched();
  }

  ngOnInit(): void {
    console.log("init", this.userEditingData);
    if (this.userEditingData) {
      this.patchEditingData();
    }
  }

  patchEditingData() {
    this.userForm.patchValue({
      personal_details: {
        user_first_name: this.userEditingData.personal_details.user_first_name,
        user_last_name: this.userEditingData.personal_details.user_last_name,
        user_gender: this.userEditingData.personal_details.user_gender,
        user_dob: this.userEditingData.personal_details.user_dob,
      },
      contact_details: {
        user_email_address: this.userEditingData.contact_details.user_email_address,
        user_phone: this.userEditingData.contact_details.user_phone,
        user_address: this.userEditingData.contact_details.user_address,
      }
    });
  }

  OnFormSubmit() {
    if (this.userEditingData) {
      this.serviceCenter.editTableDataFunc(this.userEditingData.id, this.userForm);
    } else {
      this.serviceCenter.addTableDataFunc(this.userForm);
    }
    // this.spinnerService.show();
    // if (this.userEditingData) {
    //   this.httpService.updateUser(this.userEditingData.id, this.userForm.value).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.snackbarService.showSnackBar("Success!");
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.snackbarService.showSnackBar("Error!");
    //     },
    //     complete: () => {
    //       this.onCancel();
    //       this.spinnerService.hide();
    //     }
    //   });
    // } else {
    //   this.httpService.addUser(this.userForm.value).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.snackbarService.showSnackBar("Success!");
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.snackbarService.showSnackBar("Error!");
    //     },
    //     complete: () => {
    //       this.httpService.getUsers();
    //       this.onCancel();
    //       this.spinnerService.hide();
    //     }
    //   });
    // }
  }

}