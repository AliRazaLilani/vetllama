import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-edit-billing',
  templateUrl: './edit-billing.component.html',
  styleUrls: ['./edit-billing.component.scss'],
  imports: [FormsModule, DoctorSidebarComponent, DoctorBreadcrumbComponent,RouterLink],
})
export class EditBillingComponent {
  public routes = routes;
  public billingContent1 = [0];
  public billingContent2 = [0];
  public billingContent3 = [0];

  dltBilling1(index: number) {
    this.billingContent1.splice(index, 1);
  }
  dltBilling2(index: number) {
    this.billingContent2.splice(index, 1);
  }
  addEditBill() {
    this.billingContent2.push(1);
  }
  dltEditBill(index: number) {
    this.billingContent2.splice(index, 1);
  }
}
