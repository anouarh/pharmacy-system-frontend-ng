import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  isLoading = true;

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
      this.auth.login(body.toString()).subscribe(
        (data) => {
          window.sessionStorage.setItem('token', JSON.stringify(data));
          console.log(window.sessionStorage.getItem('token'));
          this.router.navigate(['drugs']);
        },
        (error) => {
          alert(error.error.error_description);
        }
      );
    }
    console.log(form);
    form.reset();
  }

}
