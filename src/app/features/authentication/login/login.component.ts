import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, RouterLink, FormsModule],
})
export class LoginComponent {
  public routes = routes;
  constructor(private router: Router) {}
  public togglePasswordClass = false;
  togglePassword() {
    this.togglePasswordClass = !this.togglePasswordClass;
  }
  navigation(): void {
    this.router.navigate([routes.index]);
  }
}
