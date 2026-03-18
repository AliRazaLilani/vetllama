import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss'],
  imports: [RouterLink],
})
export class BlankPageComponent {
  public routes = routes;
}
