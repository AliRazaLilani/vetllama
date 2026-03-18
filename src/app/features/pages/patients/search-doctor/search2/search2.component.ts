import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { BreadcrumbSearchComponent } from '../../common/breadcrumb-search/breadcrumb-search.component';
interface data {
  value: string;
}
@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatSliderModule,
    BreadcrumbSearchComponent,
  ],
})
export class Search2Component {
  public routes = routes;
  minvalue = 251;
  maxvalue = 401;
  isMore: boolean[] = [false];
  public selectedValue = '';
  isClassAdded: boolean[] = [false];
  selectedList: data[] = [
    { value: 'A to Z' },
    { value: 'B to Z' },
    { value: 'C to Z' },
    { value: 'D to Z' },
    { value: 'E to Z' },
  ];

  toggleClass(index: number) {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }
  viewMore(index: number): void {
    this.isMore[index] = !this.isMore[index];
  }
}
