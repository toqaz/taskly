import { Router } from '@angular/router';
import { AuthService } from './../../../features/auth/services/authentication/auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  user = this.authService.getUserData();
  initials = this.user ? this.authService.getInitials(this.user.name) : ''

  isDropdownOpen = false;
  logoutError = '';

  toggleDropdown():void{
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout():void{
    this.authService.userLogOut().subscribe({
      next: ()=>{
        this.authService.clearToken();
        this.router.navigate(['/login'])
      },
      error : ()=>{
        this.logoutError = 'logout failed'
      }
    });
  }
}
