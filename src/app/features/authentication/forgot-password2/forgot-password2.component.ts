import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-forgot-password2',
  templateUrl: './forgot-password2.component.html',
  styleUrls: ['./forgot-password2.component.scss'],
  imports: [RouterLink],
})
export class ForgotPassword2Component {
  public routes = routes;
  constructor(private router: Router) {}

  navigation() {
    this.router.navigate([routes.loginEmail]);
  }
}
