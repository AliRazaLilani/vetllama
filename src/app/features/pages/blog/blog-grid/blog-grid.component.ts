import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
  imports: [RouterLink],
})
export class BlogGridComponent {
  public routes = routes;
}
