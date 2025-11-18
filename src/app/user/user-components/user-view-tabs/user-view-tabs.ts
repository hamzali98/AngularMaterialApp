import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UsertableComponent } from '../user-table/user-table.component';
import { UserForm } from '../user-form/user-form';
import { ProductView } from '@app/products/product-components/product-view/product-view';

@Component({
  selector: 'app-user-view-tabs',
  imports: [MatTabsModule, UsertableComponent, ProductView],
  templateUrl: './user-view-tabs.html',
  styleUrl: './user-view-tabs.scss',
})
export class UserViewTabs {

}
