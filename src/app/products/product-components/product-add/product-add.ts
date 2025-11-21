import { Component, inject, OnInit, viewChild } from '@angular/core';
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
export class ProductAdd {

  categories: Category[] = [
    { value: 'Beauty', viewValue: 'Male' },
    { value: 'Books', viewValue: 'Female' },
    { value: 'Sports ', viewValue: 'Others' },
    { value: 'Toys ', viewValue: 'Others' },
    { value: 'Games', viewValue: 'Others' },
    { value: 'Grocery', viewValue: 'Others' },

  ];

  productForm: FormGroup;
  userEditingData!: productInterface;


  constructor() {
    this.productForm = new FormGroup({
      product_name: new FormControl('', Validators.required),
      product_price: new FormControl('', Validators.required),
      product_category: new FormControl('', Validators.required),
      product_description: new FormControl('', Validators.required),
    });
    this.productForm.markAllAsTouched();
  }

  OnFormSubmit() { }
}
