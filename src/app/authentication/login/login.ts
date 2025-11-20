import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/auth.service';
import { CenterService } from '@app/services/servicecenter/center.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIcon, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  // loginForm!: FormGroup;
  login_email = new FormControl('', Validators.required);
  login_password = new FormControl('', Validators.required);

  private authService = inject(AuthService);
  private serviceCenter = inject(CenterService);

  constructor(){
    // this.loginForm = new FormGroup({
      // login_email: new FormControl('', Validators.required),
      // login_password: new FormControl('', Validators.required),
    // });
    // this.loginForm.markAllAsTouched();
  }

  OnFormSubmit(){
    console.log(this.login_email);
    this.serviceCenter.getLoginFunc(this.login_email.value);
  }

  // onClick() {
  //   this.authService.setLogIn();
  // }
}
