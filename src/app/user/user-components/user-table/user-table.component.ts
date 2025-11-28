import { AfterViewInit, OnInit, Component, inject, ViewChild, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { userInterface } from '@app/user/interface/user-interface';
import { MatDialog } from '@angular/material/dialog';
import { UserForm } from '../user-form/user-form';
import { CenterService } from '@app/services/servicecenter/center.service';
import { UserView } from '../user-view/user-view';
import { DataServiceService } from '@app/user/user-services/user-profile-data-service/data-service.service';

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

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'actions'];

  dataSource = new MatTableDataSource<userInterface>([]);

  private matDialog = inject(MatDialog);
  serviceCenter = inject(CenterService);
  dataService = inject(DataServiceService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.serviceCenter.getTableDataFunc();
    setTimeout(() => {
      this.dataSource.data = this.serviceCenter.tableData();
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
    this.serviceCenter.deleteTableDataFunc(data);
    this.getData();
  }

  onView(data: userInterface) {
    const dialogRef = this.matDialog.open(UserView, {
      height: '90%',
      // width: '100%',
    });
    dialogRef.componentInstance.dataSource = data;
  }

}

