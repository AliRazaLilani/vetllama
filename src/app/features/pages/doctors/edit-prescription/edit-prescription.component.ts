import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-edit-prescription',
  templateUrl: './edit-prescription.component.html',
  styleUrls: ['./edit-prescription.component.scss'],
  imports: [FormsModule, DoctorSidebarComponent, DoctorBreadcrumbComponent,RouterLink],
})
export class EditPrescriptionComponent {
  public routes = routes;
  public prescriptionCont1 = [0];
  public prescriptionCont2 = [0];
  public prescriptionCont3 = [0];

  dltPrescription1(index: number) {
    this.prescriptionCont1.splice(index, 1);
  }
  dltPrescription2(index: number) {
    this.prescriptionCont2.splice(index, 1);
  }
  addPrescription() {
    this.prescriptionCont3.push(1);
  }
  dltPrescription3(index: number) {
    this.prescriptionCont3.splice(index, 1);
  }
}
