import { AuthService } from './../../../features/auth/services/authentication/auth.service';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  isCollapsed =false

  toggleCollapse():void{
    this.isCollapsed = !this.isCollapsed
  }

  logOut():void{
    this.authService.userLogOut();
    this.router.navigate(['/login'])
  }
}
