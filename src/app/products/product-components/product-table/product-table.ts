
import { AfterViewInit, OnInit, Component, inject, ViewChild, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { productInterface } from '@app/products/interface/product-interface';
import { ProductsHttpService } from '@app/products/product-services/products-http-service/products-http.service';
import { DataServiceService } from '@app/user/user-services/user-profile-data-service/data-service.service';
import { ProductAdd } from '../product-add/product-add';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product-table',
  imports: [MatTableModule, MatPaginatorModule, DatePipe, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable {

  error:boolean = true;

  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'description', 'actions'];

  dataSource = new MatTableDataSource<productInterface>([]);

  private matDialog = inject(MatDialog);
  private pHttpService = inject(ProductsHttpService);
  dataService = inject(DataServiceService);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
    ngOnInit() {
      this.getData();
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    onClick(){
      this.error = !this.error;
    }
  
    getData() {

    }
  
    onAdd() {
      const dialogRef = this.matDialog.open(ProductAdd);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          this.getData();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
    onEdit(data: productInterface) {
      // const dialogRef = this.matDialog.open(UserForm);
      // dialogRef.componentInstance.userEditingData = data;
      // dialogRef.afterClosed().subscribe({
      //   next: (val) => {
      //     this.getData();
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   }
      // });
    }
  
    onDelete(data: productInterface) {
      // this.serviceCenter.deleteTableDataFunc(data);
      // this.getData();
    }
  
    onView(data: productInterface) {
      // const dialogRef = this.matDialog.open(UserView, {
      //   // height: '90%',
      //   // width: '100%',
      // });
      // dialogRef.componentInstance.dataSource = data;
    }
}
