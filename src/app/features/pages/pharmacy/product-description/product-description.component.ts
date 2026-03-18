import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
  imports: [RouterLink, FormsModule],
})
export class ProductDescriptionComponent {
  public routes = routes;
  public cartValue = [10, 10, 10, 10, 10];
  public addPos(i: number): void {
    this.cartValue[i]++;
  }
  public reducePos(i: number): void {
    this.cartValue[i]--;
  }
}
