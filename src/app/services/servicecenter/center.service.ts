import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from '../spinner/spinner.service';
import { SnackbarService } from '../snackservice/snackbar.service';
import { UserHttpService } from '@app/user/user-services/user-http-service/user-http.service';
import { DataServiceService } from '@app/user/user-services/user-profile-data-service/data-service.service';
// import { AuthService } from '@app/authentication/auth/auth.service';
import { userInterface } from '@app/user/interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  private _tableUsers!: userInterface[];
  private _loggedUser!: userInterface;

  tableData = signal(this._tableUsers);
  userData = signal(this._loggedUser);

  private router = inject(Router);
  private matDialogRef = inject(MatDialog);
  private snackService = inject(SnackbarService);
  private spinnerService = inject(SpinnerService);
  private userHttpService = inject(UserHttpService);
  private dataService = inject(DataServiceService);
  // private authService = inject(AuthService);

  constructor() { }

  // service getter uncomment if necessary
  // snackServiceGetter() {
  //   return this.snackService;
  // }

  spinnerServiceGetter() {
    return this.spinnerService;
  }

  // userHttpServiceGetter() {
  //   return this.userHttpService;
  // }

  dataServiceGetter() {
    return this.dataService;
  }

  // profile data api callers
  getLoginFunc(email: string | null) {
    console.log(email);
    this.spinnerService.show();
    this.userHttpService.getLogin(email).pipe(
      map(users => {
        const user = users.find(
          (u: any) => u.contact_details?.user_email_address === email
        );
        if (user) {
          return { success: true, user };
        } else {
          return { success: false, message: 'User not found' };
        }
      }),
      finalize(() => {
        this.spinnerService.hide();
      }),
    ).subscribe({
      next: (res) => {
        console.log("response", res);
        if (res.success === true) {
          this.dataService.setUserData(res.user);
          // this.router.navigate(['']);
          this.userData.set(res.user);
          this.dataService.setLogIn();
          this.snackService.success(`Login Success full for ${res.user.personal_details.user_first_name} `);

        } else {
          // this.router.navigate(['login']);
          this.dataService.setLogout();
          this.snackService.error("Login Error");
        }

      },
      error: (err) => {
        console.log(err);
        this.snackService.error("Internal server error!");
      },
      complete: () => {
      }
    });
  }

  // getUserLoginFunc(): void {
  //   this.spinnerService.show();
  //   this.userHttpService.getUser('45b9')
  //     .pipe(finalize(() => {
  //       this.spinnerService.hide();
  //     }),)
  //     .subscribe({
  //       next: (value) => {
  //         console.log("Single user data", value);
  //         this.dataService.setUserData(value);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.snackService.showSnackBar(err);
  //       },
  //       complete: () => {
  //         this.snackService.showSnackBar("Getting user....");
  //       }
  //     });
  // }

  getLoggedUserFunc() {
    console.log("calling service center function")
    this.spinnerService.show();
    this.dataService.getUserData()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (value) => {
          if (value) {
            console.log("Data in getting data service", value);
            // this.dataSource = value;
            this.userData.set(value);
            this.spinnerService.hide();
          }
        },
        error: (err) => {
          console.log(err);
        this.snackService.error("Internal server error!");

        },
        complete: () => {
          this.spinnerService.hide();
        }
      });
  }

  getLogUserAfterEditFunc(id: string) {
    this.spinnerService.show();
    this.userHttpService.getUser(id).subscribe({
      next: (res) => {
        // this.getUserLoginFunc();
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.snackService.error("Internal server error!");

      },
      complete: () => {
        this.matDialogCloseFunc();
        this.spinnerService.hide();
      }
    });
  }

  // add user data api caller
  addTableDataFunc(userForm: FormGroup) {
    this.userHttpService.addUser(userForm.value).subscribe({
      next: (res) => {
        console.log(res);
          this.snackService.success("User Added Successfully");
        this.getTableDataFunc();
      },
      error: (err) => {
        console.log(err);
        // this.snackService.error(`Adding user Failed! ${err}`);
        this.snackService.error("Internal server error!");

      },
      complete: () => {
        this.getTableDataFunc();
        this.matDialogCloseFunc();
        this.spinnerService.hide();
      }
    });
  }

  editTableDataFunc(editingUserId: string, userForm: FormGroup) {
    this.userHttpService.updateUser(editingUserId, userForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.snackService.success("Data edited successfully!");
        this.getTableDataFunc();
        this.getLogUserAfterEditFunc(editingUserId);
      },
      error: (err) => {
        console.log(err);
        // this.snackService.error(`Error ! ${err}`);
        this.snackService.error("Internal server error!");

      },
      complete: () => {
        this.getTableDataFunc();
        this.matDialogCloseFunc();
        this.spinnerService.hide();
      }
    });
  }

  // table data apis callers
  getTableDataFunc() {
    this.spinnerService.show();
    this.userHttpService.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.tableData.set(res.body);
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
        this.snackService.error("Internal server error!");

      },
      complete: () => {
        this.spinnerService.hide();

      }
    });
  }

  deleteTableDataFunc(data: userInterface) {
    this.spinnerService.show();
    console.log(data.id);
    this.userHttpService.deleteUser(data.id).subscribe({
      next: (value) => {
        console.log(value);
        this.snackService.warning(`Data against id : ${data.id} deleted`);
      },
      error: (err) => {
        console.log(err);
        // this.snackService.warning(`Data against id : ${data.id} not deleted(${err})`);
        this.snackService.error("Internal server error!");

        this.spinnerService.hide();
      },
      complete: () => {
        this.getTableDataFunc();
        this.spinnerService.hide();
      }
    });
  }

  matDialogCloseFunc() {
    this.matDialogRef.closeAll();
  }

  // authentication service code
  authCheck() {
    if (this.dataService.isLogIn()?.toString() === 'true') {
      return true;
    } else {
      return false;
    }
    // return this.dataService.isLogIn();
  }

}
