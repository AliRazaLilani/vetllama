import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.scss'],
  imports: [FormsModule, RouterLink, DoctorBreadcrumbComponent],
})
export class AddBillingComponent {
  public routes = routes;
  public content1 = [0];
  public content2 = [0];

  addItem() {
    this.content1.push(1);
  }
  deleteItem1(index: number) {
    this.content1.splice(index, 1);
  }
  deleteItem2(index: number) {
    this.content2.splice(index, 1);
  }
}
