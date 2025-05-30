import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../shared/models/login';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  localHost: string = 'https://localhost:7023/api/auth';

  authHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  isLogged: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  checkLogin(credentials: Login) {
    return this.http.post(`${this.localHost}/login`, credentials, {
      headers: this.authHeader,
      responseType: 'json',
    });
  }

  setLoginStatus(loginOk: boolean, token: string) {
    this.isLogged = loginOk;

    if (loginOk) {
      localStorage.setItem('token', token);
      this.authHeader = this.authHeader.set('Authorization', 'Bearer ' + token);
    } else {
      localStorage.removeItem('token');
      this.authHeader = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('refreshToken');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  //const helper = new JwtHelperService();

  // if (helper.isTokenExpired(token)) {
  //   return false;
  // }

  // const decoded = helper.decodeToken(token);
  // console.log(decoded);
  // if(decoded.mfaEnable == "True"){
  //   if(decoded.mfaConfirmed == "False"){
  //     return false;
  //   }
  // }
  return true; 
}


}
