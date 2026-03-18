import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [RouterModule],
})
export class RegisterComponent {
  public routes = routes;
}
