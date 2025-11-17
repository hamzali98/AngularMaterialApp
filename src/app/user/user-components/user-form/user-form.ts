import { Component, inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserHttpService } from '@app/user/user-services/user-http-service/user-http.service';

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
    MatTooltipModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {

  genders: Gender[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'others', viewValue: 'Others' },
  ];

  private httpService = inject(UserHttpService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);

  userForm: FormGroup;

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

  addUser() {
    this.httpService.addUser(this.userForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open('User Submitted', '', {
          duration: 5000,
          panelClass: ["success"]
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('User Submitted', '', {
          duration: 5000,
          panelClass: ["error"]
        });
      }
    });

    // if (this.userForm.invalid) {
    //   const snackRef = this._snackBar.open('Form Invalid', 'Dismis', {
    //     horizontalPosition: "center",
    //     verticalPosition: "bottom",
    //   });
    // } else {
    //   this._snackBar.open('form Submitted!', 'Dismis', {
    //     horizontalPosition: "center",
    //     verticalPosition: "bottom",
    //   });
    // }
  }

}