import { Component } from '@angular/core';
import { routes } from 'src/app/core/routes/routes';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
  imports: [RouterModule],
})
export class ErrorsComponent {
  public routes = routes;
}
