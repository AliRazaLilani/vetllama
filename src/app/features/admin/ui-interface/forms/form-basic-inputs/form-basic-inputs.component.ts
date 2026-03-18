import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-basic-inputs',
  templateUrl: './form-basic-inputs.component.html',
  styleUrls: ['./form-basic-inputs.component.scss'],
  imports: [RouterLink],
})
export class FormBasicInputsComponent {
  public routes = routes;
}
