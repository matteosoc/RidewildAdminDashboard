import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private authSvc : AuthService){
  }

  isLogged() : boolean {
    return this.authSvc.isLoggedIn();
  }

  logout() : void {
    this.authSvc.logout();
  }


}
