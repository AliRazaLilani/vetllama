import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DoctorSidebarComponent } from '../common/doctor-sidebar/doctor-sidebar.component';
import { DoctorBreadcrumbComponent } from '../common/doctor-breadcrumb/doctor-breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-doctor-payment',
    templateUrl: './doctor-payment.component.html',
    styleUrls: ['./doctor-payment.component.scss'],
    imports:[CommonModule,FormsModule,DoctorSidebarComponent,DoctorBreadcrumbComponent,MatSelectModule,
      MatSliderModule,RouterLink
    ]
})
export class DoctorPaymentComponent {
  activeBox: number = 2;
  toggleActive(boxNumber: number): void {
    this.activeBox = boxNumber; 
  }
}
