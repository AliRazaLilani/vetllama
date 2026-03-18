import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
  imports: [RouterLink],
})
export class Error404Component {
  public routes = routes;
}
