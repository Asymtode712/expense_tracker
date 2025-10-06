// signup.component.ts (NO CRITICAL CHANGES, just cleanup)

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  SignUpContinue: boolean = false; // Initialized here

  @Output() switchToLogin = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public route: Router
  ) { }

  ngOnInit(): void {
    // REMOVED: this.SignUpContinue=false; // Already initialized above
    this.signUpForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      // Renamed 'gmail' to 'email' in my mental model for cleaner code,
      // but keeping 'gmail' to match your uploaded code structure:
      gmail: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  onSwitchToLogin(): void {
    this.switchToLogin.emit();
  }

  onProceed() {
    this.SignUpContinue = true;
    this.authService
      .onSignUp(this.signUpForm.value)
      .then(() => {
        this.SignUpContinue = false;
      })
      .catch((error: any) => {
    // Handle error response here
        this.SignUpContinue = false;
        // ... (Show snackbar or error message)
      });
  }
}