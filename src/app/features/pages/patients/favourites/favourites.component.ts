import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { PatientSidebarComponent } from '../common/patient-sidebar/patient-sidebar.component';
import { PatientBreadcrumbComponent } from '../common/patient-breadcrumb/patient-breadcrumb.component';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    PatientSidebarComponent,
    PatientBreadcrumbComponent,
  ],
})
export class FavouritesComponent {
  public isFavourite: boolean[] = Array(10).fill(true);
  public routes = routes;
  toggleFavourite(index: number) {
    if (this.isFavourite[index] !== undefined) {
      this.isFavourite[index] = !this.isFavourite[index];
    }
  }
}
