import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { matchValidator } from './form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = '';
  roles: string[] = ['admin', 'moderator'];

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      rePassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          matchValidator('password'),
        ],
        updateOn: 'blur',
      }),
      userRole: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit(): void {
    console.log(this.registerForm.value);
    const username: string = this.registerForm.controls['username'].value;
    const email: string = this.registerForm.controls['email'].value;
    const password: string = this.registerForm.controls['password'].value;
    const role: string = this.registerForm.controls['userRole'].value;

    this.authService.register(username, email, password, role).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
