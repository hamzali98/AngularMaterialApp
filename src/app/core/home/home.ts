import { Component } from '@angular/core';
import { SidenavComponent } from "../side-nav/side-nav.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
