import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class LoginEmailComponent {
  public routes = routes;
  public togglePasswordClass = false;

  constructor(private router: Router) {}

  public navigation() {
    this.router.navigate([routes.loginEmailOtp]);
  }
  togglePassword() {
    this.togglePasswordClass = !this.togglePasswordClass;
  }
}
