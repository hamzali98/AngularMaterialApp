import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnackbarService } from '@app/services/snackservice/snackbar.service';
import { SpinnerService } from '@app/services/spinner/spinner.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { productInterface } from '@app/products/interface/product-interface';
import { ProductsHttpService } from '@app/products/product-services/products-http-service/products-http.service';
import { CenterService } from '@app/services/servicecenter/center.service';
import { finalize } from 'rxjs';


interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-add',
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
  templateUrl: './product-add.html',
  styleUrl: './product-add.scss',
})
export class ProductAdd implements OnInit {

  categories: Category[] = [
    { value: 'Beauty', viewValue: 'Male' },
    { value: 'Books', viewValue: 'Female' },
    { value: 'Sports ', viewValue: 'Others' },
    { value: 'Toys ', viewValue: 'Others' },
    { value: 'Games', viewValue: 'Others' },
    { value: 'Grocery', viewValue: 'Others' },

  ];

  productForm: FormGroup;
  productEditingData!: productInterface;

  httpService = inject(ProductsHttpService);
  snackService = inject(SnackbarService);
  spinnerService = inject(SpinnerService);
  matDialog = inject(MatDialog);

  constructor() {
    this.productForm = new FormGroup({
      product_name: new FormControl('', Validators.required),
      product_price: new FormControl('', Validators.required),
      product_category: new FormControl('', Validators.required),
      product_description: new FormControl('', Validators.required),
    });
    this.productForm.markAllAsTouched();
  }

  ngOnInit() {
    if(this.productEditingData){
      this.pathEditingData();
    }
  }

  pathEditingData(){
    this.productForm.patchValue({
      product_name: this.productEditingData.product_name,
      product_price: this.productEditingData.product_price,
      product_category: this.productEditingData.product_category,
      product_description: this.productEditingData.product_description
    });
  }

  OnFormSubmit() {
    if (this.productEditingData) {
      this.spinnerService.show();
      this.httpService.editProduct(this.productEditingData.id, this.productForm.value).pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.snackService.success("Product Updated!");
          },
          error: (err) => {
            console.log(err);
            this.snackService.error("Internal server error");
          },
          complete: () => {
            this.dialogClose();
          }
        });
    } else {
      this.spinnerService.show();
      this.httpService.addProduct(this.productForm.value).pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.snackService.success("Product added!");
          },
          error: (err) => {
            console.log(err);
            this.snackService.error("Internal server error");
          },
          complete: () => {
            this.dialogClose();
          }
        });
    }
  }

  dialogClose() {
    this.matDialog.closeAll();
  }
}
