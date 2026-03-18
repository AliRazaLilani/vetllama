import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [RouterModule],
})
export class SettingsComponent {
  public routes = routes;
}
