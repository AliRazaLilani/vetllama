import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-vertical',
  templateUrl: './form-vertical.component.html',
  styleUrls: ['./form-vertical.component.scss'],
  imports: [RouterLink],
})
export class FormVerticalComponent {
  public routes = routes;
}
