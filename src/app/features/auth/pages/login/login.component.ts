import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      ),
    ]),
    rememberMe: new FormControl(false)
  });

  submitLoginForm(): void {
    if (this.loginForm.valid) {
      const {email , password , rememberMe } = this.loginForm.value;

      this.authService.sendLoginData({email,password}).subscribe({
        next: (res) => {
          if (res.access_token) {
            this.authService.saveToken(res.access_token,rememberMe)
            this.router.navigate(['/project']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
