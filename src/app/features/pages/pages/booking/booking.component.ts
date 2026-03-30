import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routes } from 'src/app/core/routes/routes';

interface data {
  value: string;
}

@Component({
  selector: 'app-booking',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatSelectModule,
    BsDatepickerModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  routes = routes;
  public selectedFieldSet = [1];
  bsInlineValue = new Date();
  isClinic = true;

  selectedValue1 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'Dependent 01' },
    { value: 'Dependent 02' },
    { value: 'Dependent 03' },
    { value: 'Dependent 04' },
  ];

  species = [
    { value: 'Select Species' },
    { value: 'Dog' },
    { value: 'Cat' },
    { value: 'Rabbit' },
    { value: 'Bird' },
    { value: 'Other' },
  ];

  concerns = [
    { id: 'allergies', label: 'Allergies', icon: 'fa-allergies' },
    { id: 'skin', label: 'Skin & Coat', icon: 'fa-spa' },
    { id: 'ear', label: 'Ear', icon: 'fa-ear-deaf' },
    { id: 'eye', label: 'Eye', icon: 'fa-eye' },
    { id: 'urinary', label: 'Urinary', icon: 'fa-water' },
    { id: 'flea', label: 'Flea / Tick', icon: 'fa-bug' },
    { id: 'vomiting', label: 'Vomiting & Diarrhea', icon: 'fa-heartbeat' },
    { id: 'joint', label: 'Joint Health', icon: 'fa-bone' },
    { id: 'nutrition', label: 'Nutrition', icon: 'fa-apple-alt' },
    { id: 'obesity', label: 'Obesity', icon: 'fa-weight' },
    { id: 'dental', label: 'Dental', icon: 'fa-tooth' },
    { id: 'heart', label: 'Heart & Circulation', icon: 'fa-heart' },
    { id: 'seizure', label: 'Seizure & Brain', icon: 'fa-head-side-virus' },
    { id: 'respiratory', label: 'Respiratory', icon: 'fa-lungs' },
    { id: 'infection', label: 'Infection', icon: 'fa-bacteria' },
    { id: 'cancer', label: 'Cancer', icon: 'fa-radiation' },
    { id: 'hormones', label: 'Gland & Hormones', icon: 'fa-capsules' },
    { id: 'endoflife', label: 'End of Life', icon: 'fa-hands' },
    { id: 'wellness', label: 'Wellness / Checkup', icon: 'fa-check-circle' },
    { id: 'other_concern', label: 'Other', icon: 'fa-plus' },
  ];

  petName = '';
  petBreed = '';
  petDob = new Date();
  petSex = 'Male';
  insurance = 'no';
  reason = '';

  firstName = '';
  lastName = '';
  email = '';
  phone = '';

  showClinic(): void {
    this.isClinic = true;
  }

  offClinic(): void {
    this.isClinic = false;
  }
}
