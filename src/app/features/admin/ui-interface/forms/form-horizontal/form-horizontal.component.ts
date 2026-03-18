import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-horizontal',
  templateUrl: './form-horizontal.component.html',
  styleUrls: ['./form-horizontal.component.scss'],
  imports: [RouterLink],
})
export class FormHorizontalComponent {
  public routes = routes;
}
