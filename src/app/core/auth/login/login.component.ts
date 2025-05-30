import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../../shared/models/login';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', { validators : [Validators.email, Validators.required]}),
    password: new FormControl('', { validators : [Validators.required, Validators.minLength(1)]}),
  });

  credentials: Login = new Login();
  isLogged: boolean = false;

  constructor(private authSvc: AuthService, private router : Router) {}

  OnSubmit() {
    if (!this.loginForm.valid) {
      alert('form non valido');
      return;
    }

    this.credentials.email = this.loginForm.value.email!;
    this.credentials.password = this.loginForm.value.password!;

    this.authSvc.checkLogin(this.credentials).subscribe({
      next: (response: any) => {
        console.log(response);

        if (response.success) {
          this.isLogged = true;
          this.authSvc.setLoginStatus(this.isLogged, response.token);
          alert("Login effettuato")
          this.router.navigate(['/']);
        }
      },
      error : (error: HttpErrorResponse) => {
        
        switch(error.status){
          case 401:
            alert("credenziali errate")
            break;
          case 500:
            alert ("il server non ha risposto");
            break;
        }
      }
    });
  }
}
