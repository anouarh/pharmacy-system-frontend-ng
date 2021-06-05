import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  openDialog() {
    this.dialog.open(SignupDialogComponent);
  }

  login() {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const username = form.value.username;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.login(username, password).subscribe((resData) => {
        console.log(resData);
      });
    } else {
      this.openDialog();
    }

    form.reset();
  }
}

@Component({
  selector: 'signup-dialog',
  templateUrl: 'signup-dialog.component.html',
})
export class SignupDialogComponent {}
