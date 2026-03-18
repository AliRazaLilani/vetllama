import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-login-email-otp',
  templateUrl: './login-email-otp.component.html',
  styleUrls: ['./login-email-otp.component.scss'],
  imports: [RouterLink],
})
export class LoginEmailOtpComponent {
  public routes = routes;
  constructor(private router: Router) {}

  public navigation() {
    this.router.navigate([routes.emailOtp]);
  }
}
