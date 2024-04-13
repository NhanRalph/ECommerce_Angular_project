import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isLoggingIn!: boolean;
  isRecoveringPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.minLength(6)
        ]),
      ],
    });
  }

  ngOnInit() {}

  login() {
    this.userService
      .signIn(this.signinForm.value.email, this.signinForm.value.password)
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error: any) => {
          alert(error.message);
        },
      });
  }

  // recoverPassword() {
  //   this.isRecoveringPassword = true;

  //   this.authenticationService.recoverPassword(
  //     this.form.value.email
  //   ).subscribe({
  //     next: () => {
  //       this.isRecoveringPassword = false;
  //       this.snackBar.open("You can recover your password in your email account.", "OK", {
  //         duration: 5000
  //       });
  //     },
  //     error: error => {
  //       this.isRecoveringPassword = false;
  //       this.snackBar.open(error.message, "OK", {
  //         duration: 5000
  //       });
  //     }
  //   })
  // }
}
