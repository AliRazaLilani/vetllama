import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { BreadcrumbSearchComponent } from '../../common/breadcrumb-search/breadcrumb-search.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-doctor-grid',
  templateUrl: './doctor-grid.component.html',
  styleUrls: ['./doctor-grid.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatSliderModule,
    BreadcrumbSearchComponent,
    LightgalleryModule,
    MatSelectModule,
  ],
})
export class DoctorGridComponent {
  routes = routes;
  minvalue = 251;
  maxvalue = 401;
  isMore: boolean[] = [false];
  viewMore(index: number): void {
    this.isMore[index] = !this.isMore[index];
  }
}
