import { inject, Injectable, signal } from '@angular/core';
import { SnackbarService } from '../snackservice/snackbar.service';
import { SpinnerService } from '../spinner/spinner.service';
import { UserHttpService } from '@app/user/user-services/user-http-service/user-http.service';
import { DataServiceService } from '@app/user/user-services/user-profile-data-service/data-service.service';
import { userInterface } from '@app/user/interface/user-interface';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  private user!: userInterface[];

  tableData = signal(this.user);

  private snackService = inject(SnackbarService);
  private spinnerService = inject(SpinnerService);
  private httpService = inject(UserHttpService);
  private dataService = inject(DataServiceService);

  constructor() { }

  // service getter uncomment if necessary
  // getsnackService() {
  //   return this.snackService;
  // }

  // getspinnerService() {
  //   return this.spinnerService;
  // }

  // getuserHttpService() {
  //   return this.userHttpService;
  // }

  getdataService() {
    return this.dataService;
  }

  // profile data api callers
  

  // table data apis callers
  getTableData() {
    this.spinnerService.show();
    this.httpService.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.tableData.set(res.body);
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      },
      complete: () => {
        this.spinnerService.hide();

      }
    });
  }

  deleteTableData(data: userInterface) {
    this.spinnerService.show();
    console.log(data.id);
    this.snackService.showSnackBar(`this is id : ${data.id}`);
    this.httpService.deleteUser(data.id).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
        this.snackService.showSnackBar(`Error Deleting User ${data.id}`);
        this.spinnerService.hide();
      },
      complete: () => {
        this.getTableData();
        this.snackService.showSnackBar(`Deleted User ${data.id}`);
        this.spinnerService.hide();
      }
    });
  }

}
