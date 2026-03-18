import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
    selector: 'app-invoice-view',
    templateUrl: './invoice-view.component.html',
    styleUrls: ['./invoice-view.component.scss'],
    imports: [RouterLink,CommonModule]
})
export class InvoiceViewComponent {
  public routes = routes;

}
