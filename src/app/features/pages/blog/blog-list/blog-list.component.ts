import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  imports: [RouterLink],
})
export class BlogListComponent {
  public routes = routes;
}
