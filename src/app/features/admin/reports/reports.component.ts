import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [RouterModule],
})
export class ReportsComponent {
  public routes = routes;
}
