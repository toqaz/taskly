import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent , SidebarComponent , RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
