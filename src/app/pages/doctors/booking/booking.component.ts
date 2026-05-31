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
  minDate = new Date();
  isClinic = true;

  selectedSlotTime = '';

  morningSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
  ];
  afternoonSlots = [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ];
  eveningSlots = [
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
  ];

  isSlotDisabled(slotTime: string): boolean {
    const now = new Date();
    const selectedDate = new Date(this.bsInlineValue);

    // If selected date is in the past (shouldn't happen with minDate), it's disabled
    if (
      selectedDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
    ) {
      return true;
    }

    // If selected date is in the future, all slots are enabled
    if (selectedDate.toDateString() !== now.toDateString()) {
      return false;
    }

    // If selected date is today, check if the slot's time is in the past
    const [hours, minutes] = slotTime.split(':').map(Number);
    const slotDate = new Date(selectedDate);
    slotDate.setHours(hours, minutes, 0, 0);

    return slotDate < now;
  }

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

  name = '';
  email = '';
  phone = '';

  showClinic(): void {
    this.isClinic = true;
  }

  offClinic(): void {
    this.isClinic = false;
  }
}
