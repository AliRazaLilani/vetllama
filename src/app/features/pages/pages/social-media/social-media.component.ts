import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
import { DoctorSidebarComponent } from '../../doctors/common/doctor-sidebar/doctor-sidebar.component';

interface MedicalData {
  id: number;
}
@Component({
    selector: 'app-social-media',
    templateUrl: './social-media.component.html',
    styleUrls: ['./social-media.component.scss'],
    imports: [RouterLink,CommonModule,MatSelectModule,DoctorSidebarComponent]
})
export class SocialMediaComponent {
  public routes = routes;

  medical: Array<MedicalData> = [];

  addMedical() {
    const newRecord: MedicalData = {
      id: 1,
    };
    this.medical.push(newRecord);
  }
}
