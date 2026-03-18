import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-terms-condition',
    templateUrl: './terms-condition.component.html',
    styleUrls: ['./terms-condition.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class TermsConditionComponent {
  public routes = routes;

}
