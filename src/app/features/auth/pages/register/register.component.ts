import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';

function hasUpperLowerDigit(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const valid =
    /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
  return valid ? null : { upperLowerDigit: true };
}

function hasSpectialChar(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const valid = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  return valid ? null : { spectialChar: true };
}
function passwordMatch(group: AbstractControl): ValidationErrors | null {
  let password = group.get('password')?.value;
  let repassword = group.get('repassword')?.value;

  return password === repassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink ,ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          hasUpperLowerDigit,
          hasSpectialChar,
        ]),
        repassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          hasUpperLowerDigit,
          hasSpectialChar,
        ]),
      },
      { validators: passwordMatch },
    ),
    rememberMe: new FormControl(false),
    data: new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(
          /^[a-zA-Z\u00C0-\u024F\u0600-\u06FF\u0750-\u077F]+( [a-zA-Z\u00C0-\u024F\u0600-\u06FF\u0750-\u077F]+)*$/,
        ),
      ]),
      department: new FormControl(null),
    }),
  });

  submitRegisterForm(): void {
    if (this.registerForm.valid) {
      const { email, passwords, data ,rememberMe } = this.registerForm.value;
      const registerInfo = {
        email,
        password: passwords.password,
        data: {
          name: data.name,
          department: data.department,
        },
      };
      this.authService.sendRegisterData(registerInfo).subscribe({
        next: (res) => {
          if(res.access_token){
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
