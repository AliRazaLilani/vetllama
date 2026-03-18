import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form-mask',
  templateUrl: './form-mask.component.html',
  styleUrls: ['./form-mask.component.scss'],
  imports: [RouterLink, NgxMaskDirective],
})
export class FormMaskComponent {
  public routes = routes;
}
