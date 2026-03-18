import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss'],
  imports: [FormsModule, RouterLink, DoctorBreadcrumbComponent],
})
export class AddPrescriptionComponent {
  public routes = routes;
  public content = [0];

  addItem() {
    this.content.push(1);
  }
  deleteItem(index: number) {
    this.content.splice(index, 1);
  }
}
