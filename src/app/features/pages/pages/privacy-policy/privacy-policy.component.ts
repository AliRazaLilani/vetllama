  import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class PrivacyPolicyComponent {
  public routes = routes;

}
