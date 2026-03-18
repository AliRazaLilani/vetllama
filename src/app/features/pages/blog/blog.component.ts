import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  imports: [RouterModule],
})
export class BlogComponent {
  public routes = routes;
}
