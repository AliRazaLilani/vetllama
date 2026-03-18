import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class MaintenanceComponent {
  public routes = routes;

}
