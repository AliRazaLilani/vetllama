import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class FaqComponent {
  public routes = routes;

}
