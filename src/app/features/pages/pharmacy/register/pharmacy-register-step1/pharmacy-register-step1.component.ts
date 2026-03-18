import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-pharmacy-register-step1',
  templateUrl: './pharmacy-register-step1.component.html',
  styleUrls: ['./pharmacy-register-step1.component.scss'],
  imports: [RouterLink],
})
export class PharmacyRegisterStep1Component {
  public routes = routes;
}
