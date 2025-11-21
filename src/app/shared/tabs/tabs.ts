import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UsertableComponent } from '@app/user/user-components/user-table/user-table.component';
import { ProductTable } from '@app/products/product-components/product-table/product-table';

@Component({
  selector: 'apptabs',
  imports: [MatTabsModule, UsertableComponent, ProductTable],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {

}
