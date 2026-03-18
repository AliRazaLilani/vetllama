import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-input-groups',
  templateUrl: './form-input-groups.component.html',
  styleUrls: ['./form-input-groups.component.scss'],
  imports: [RouterLink],
})
export class FormInputGroupsComponent {
  public routes = routes;
}
