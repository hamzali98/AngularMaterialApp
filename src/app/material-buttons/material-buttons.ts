import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-material-buttons',
  imports: [MatButtonModule, MatTooltip, MatIconModule, MatListModule],
  templateUrl: './material-buttons.html',
  styleUrl: './material-buttons.scss',
})
export class MaterialButtons {

}
