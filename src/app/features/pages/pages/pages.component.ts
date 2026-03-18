import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    imports: [RouterModule]
})
export class PagesComponent {
  public routes = routes;

}
