import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss'],
  imports: [RouterLink],
})
export class LockScreenComponent {
  public routes = routes;
  constructor(private router: Router) {}

  public navigation() {
    this.router.navigate([routes.adminDashboard]);
  }
}
