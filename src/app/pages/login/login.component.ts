import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    if (this.isLoginMode) {
      this.isLoading = true;
      this.auth.login(body.toString(), username).subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.router.navigate(['dashboard']);
        },
        (error) => {
          alert(error.error.error_description);
        }
      );
    }
    console.log(form);
    //form.reset();
  }
}
