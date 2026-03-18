import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class ProductAllComponent {
  public routes = routes;
  public isClassAdded: boolean[] = [false];
  toggleClass(index: number) {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }
}
