
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
interface specialities {

}

@Component({
    selector: 'app-doctor-specialities',
    templateUrl: './doctor-specialities.component.html',
    styleUrls: ['./doctor-specialities.component.scss'],
    imports: [FormsModule, DoctorSidebarComponent, DoctorBreadcrumbComponent, MatSelectModule,RouterLink]
})
export class DoctorSpecialitiesComponent {
  cardiology: specialities[] = [{}];
  neurology: specialities[] = [{}];
  urology: specialities[] = [{}];
  speciality: Array<specialities> = []

  addCardiology() {
    this.cardiology.push({});
  }
  addNeurology() {
    this.neurology.push({});
  }
  addUrology() {
    this.urology.push({});
  }
  addSpeciality() {
    this.speciality.push(1)
  }

  dltCardiology(index: number) {
    this.cardiology.splice(index, 1);
  }
  dltNeurology(index: number) {
    this.neurology.splice(index, 1);
  }
  dltUrology(index: number) {
    this.urology.splice(index, 1);
  }
}
