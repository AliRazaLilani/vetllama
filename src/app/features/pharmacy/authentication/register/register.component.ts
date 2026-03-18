import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [RouterLink],
})
export class RegisterComponent {
  public routes = routes;
  constructor(private router: Router) {}

  public navigation() {
    this.router.navigate([routes.pharmacyLogin]);
  }
}
