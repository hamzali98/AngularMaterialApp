import { AfterViewInit, OnInit, Component, inject, ViewChild, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserHttpService } from '@app/user/user-services/user-http-service/user-http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { userInterface } from '@app/user/interface/user-interface';
import { SpinnerService } from '@app/services/spinner/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { UserForm } from '../user-form/user-form';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-usertable',
  styleUrl: 'user-table.component.scss',
  templateUrl: 'user-table.component.html',
  imports: [MatTableModule, MatPaginatorModule, DatePipe, MatIconModule, MatButtonModule],
})
export class UsertableComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'gender', 'dob', 'email', 'phone', 'address', 'actions'];

  dataSource = new MatTableDataSource<userInterface>;

  private httpService = inject(UserHttpService);
  private spinnerService = inject(SpinnerService);
  private matDialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){
    this.getData();
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(){
    // this.getData();
    // this.dataSource.paginator = this.paginator;

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.spinnerService.show();
    this.httpService.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
        this.dataSource = res.body;
          
        }, 1000);
        // this.dataSource = res.body;
        console.log(this.dataSource);
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinnerService.hide();
      }
    });
  }

  openDialog(){
    const dialogRef = this.matDialog.open(UserForm, {
      height: '75%',
      width: '500px'
    });
    // dialogRef.componentInstance.userForm = 
  }

  onDelete(data: userInterface){
    console.log(data);
    console.log(data.id);

  }

}

// export interface user {
//   id: string,
//   personal_details: {
//     user_first_name: string,
//     user_last_name: string,
//     user_gender: string,
//     user_dob: string
//   },
//   contact_details: {
//     user_email_address: string,
//     user_phone: string,
//     user_address: string,
//   }
// }



//   export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];
