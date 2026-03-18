import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class ContactUsComponent {
  public routes = routes;

}
