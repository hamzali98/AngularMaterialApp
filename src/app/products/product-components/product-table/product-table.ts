
import { AfterViewInit, OnInit, Component, inject, ViewChild, signal, computed, model } from '@angular/core';
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
import { SpinnerService } from '@app/services/spinner/spinner.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '@app/services/snackservice/snackbar.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-table',
  imports: [
    // MatTableModule,
    // MatPaginatorModule,
    // DatePipe,
    MatIconModule,
    // MatButtonModule,
    // MatInputModule,
    // MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable {

  error: boolean = true;

  itemsPerPage = new FormControl<any>(10);
  currentPage: number = 1;
  startIndex: number = 0;
  endIndex: number = 0;
  totalItems = model<number>(0);
  currentPageData: any[] = [];

  // dataSource : productInterface = [];
  dataSource!: productInterface[];

  private matDialog = inject(MatDialog);
  private pHttpService = inject(ProductsHttpService);
  dataService = inject(DataServiceService);
  private spinnerService = inject(SpinnerService);
  private snackService = inject(SnackbarService);

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
  }

  onClick() {
    this.error = !this.error;
  }

  getData() {
    this.spinnerService.show();
    this.pHttpService.getData().pipe(
      finalize(() => {
        this.spinnerService.hide();
      })
    )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource = res.body;
          console.log(this.dataSource);
          this.totalItems.set(res.body.length);
          this.updatePagedData();

        },
        error: (err) => {
          console.log(err);
        }
      })
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
    const dialogRef = this.matDialog.open(ProductAdd);
    dialogRef.componentInstance.productEditingData = data;
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDelete(pid: string) {
    this.spinnerService.show();
    this.pHttpService.deleteproduct(pid).pipe(
      finalize(() => {
        this.spinnerService.hide();
        this.getData();
      }))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.snackService.success("Data Deleted");
        },
        error: (err) => {
          console.log(err);
          this.snackService.error("Internal Server error!");
        }
      })
  }

  onView(data: productInterface) {
    // const dialogRef = this.matDialog.open(UserView, {
    //   // height: '90%',
    //   // width: '100%',
    // });
    // dialogRef.componentInstance.dataSource = data;
  }

  get displayStartIndex() {
    return this.dataSource ? this.startIndex + 1 : this.startIndex;
  }

  setItemsPerPage() {
    console.log(this.itemsPerPage.value);
    this.updatePagedData();
  }

  updatePagedData() {
    const itemperpagevalue = this.itemsPerPage.value ?? 10;
    this.startIndex = (this.currentPage - 1) * itemperpagevalue;
    this.endIndex = this.startIndex + itemperpagevalue;
    if (this.endIndex > this.totalItems()) {
      this.endIndex = this.totalItems();
    }
    this.currentPageData = this.dataSource.slice(this.startIndex, this.endIndex);
  }

  previousPage() {
    console.log('prev button clicked');
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  nextPage() {
    const itemperpagevalue = this.itemsPerPage.value ?? 10;
    console.log('next button clicked');
    const totalpages = this.dataSource.length / itemperpagevalue;
    if (this.currentPage < totalpages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }
}
