import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
interface data {
  value: string;
}
@Component({
  selector: 'app-doctor-search-grid',
  templateUrl: './doctor-search-grid.component.html',
  styleUrls: ['./doctor-search-grid.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DoctorBreadcrumbComponent,
    MatSelectModule,
    MatSliderModule,
  ],
})
export class DoctorSearchGridComponent {
  minvalue = 251;
  maxvalue = 401;
  public routes = routes;
  public isCollapsed = true;
  isClassAdded: boolean[] = [false];
  public selectedValue = '';

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
  isCollapsedExperience = false;
  isCollapsedSpeciality = false;
  isCollapsedConsultation = false;

  toggleCollapse(listType: 'experience' | 'speciality' | 'consultation') {
    if (listType === 'experience') {
      this.isCollapsedExperience = !this.isCollapsedExperience;
    } else if (listType === 'speciality') {
      this.isCollapsedSpeciality = !this.isCollapsedSpeciality;
    } else if (listType === 'consultation') {
      this.isCollapsedConsultation = !this.isCollapsedConsultation;
    }
  }
}
