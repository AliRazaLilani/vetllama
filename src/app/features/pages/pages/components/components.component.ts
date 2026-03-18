import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class ComponentsComponent {
  public routes = routes;

}
