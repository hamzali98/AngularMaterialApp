import { AfterViewInit, OnInit, Component, inject, ViewChild, signal, computed } from '@angular/core';
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
import { SnackbarService } from '@app/services/snackservice/snackbar.service';
import { CenterService } from '@app/services/servicecenter/center.service';
import { UserView } from '../user-view/user-view';

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

  dataSource = new MatTableDataSource<userInterface>([]);

  private matDialog = inject(MatDialog);
  servicecenter = inject(CenterService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }


  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.servicecenter.getTableData();
    setTimeout(() => {
      this.dataSource.data = this.servicecenter.tableData();
    }, 1200);
  }

  onAdd() {
    const dialogRef = this.matDialog.open(UserForm);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onEdit(data: userInterface) {
    const dialogRef = this.matDialog.open(UserForm);
    dialogRef.componentInstance.userEditingData = data;
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDelete(data: userInterface) {
    this.servicecenter.deleteTableData(data);
  }

  onView(data: userInterface) {
    const dialogRef = this.matDialog.open(UserView, {
      // height: '90%',
      // width: '100%',
    });
    dialogRef.componentInstance.dataSource = data;
  }

}

