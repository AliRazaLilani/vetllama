import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { routes } from 'src/app/core/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink, MatSelectModule],
})
export class PatientDetailsComponent {
  public routes = routes;
  public selectedValue1 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'Dependent 01' },
    { value: 'Dependent 02' },
    { value: 'Dependent 03' },
    { value: 'Dependent 04' },
  ];

  // License Type dropdown
  licenseTypes: data[] = [
    { value: 'Select License Type' },
    { value: 'DVM' },
    { value: 'BVSC' },
    { value: 'Other' },
  ];

  // License State/Location dropdown
  states: data[] = [
    { value: 'Select state' },
    { value: 'California' },
    { value: 'Texas' },
    { value: 'Florida' },
    { value: 'New York' },
  ];

  // Years of Practice dropdown
  yearsOfPractice: data[] = [
    { value: 'Less than 1 year' },
    { value: '1-5 years' },
    { value: '5-10 years' },
    { value: '10+ years' },
  ];

  // Species list
  species = [
    { id: 'dog', label: 'Dog', icon: 'fa-dog' },
    { id: 'cat', label: 'Cat', icon: 'fa-cat' },
    { id: 'horse', label: 'Horse', icon: 'fa-horse' },
    { id: 'bird', label: 'Bird', icon: 'fa-dove' },
    { id: 'rabbit', label: 'Rabbit', icon: 'fa-rabbit' },
    { id: 'mammal', label: 'Small Mammal', icon: 'fa-paw' },
    { id: 'reptile', label: 'Reptile', icon: 'fa-fan' },
    { id: 'fish', label: 'Fish/Aquatic', icon: 'fa-fish' },
    { id: 'farm', label: 'Farm Animal', icon: 'fa-cow' },
  ];

  // Specializations list
  specializations = [
    { id: 'allergies', label: 'Allergies', icon: 'fa-allergies' },
    { id: 'skin', label: 'Skin & Coat', icon: 'fa-spa' },
    { id: 'ear', label: 'Ear', icon: 'fa-ear' },
    { id: 'eye', label: 'Eye', icon: 'fa-eye' },
    { id: 'urinary', label: 'Urinary', icon: 'fa-water' },
    { id: 'mites', label: 'Mites/Tick', icon: 'fa-bug' },
    { id: 'joint', label: 'Joint Health', icon: 'fa-bone' },
    { id: 'vomiting', label: 'Vomiting & Diarrhea', icon: 'fa-heartbeat' },
    { id: 'nutrition', label: 'Nutrition', icon: 'fa-apple-alt' },
    { id: 'obesity', label: 'Obesity', icon: 'fa-weight' },
    { id: 'dental', label: 'Dental', icon: 'fa-tooth' },
    { id: 'heart', label: 'Heart & Circulation', icon: 'fa-heart' },
    { id: 'seizure', label: 'Seizure & Brain', icon: 'fa-head-side-virus' },
    { id: 'respiratory', label: 'Respiratory', icon: 'fa-lungs' },
    { id: 'infection', label: 'Infection', icon: 'fa-microbe' },
    { id: 'cancer', label: 'Cancer', icon: 'fa-radiation' },
    { id: 'hormones', label: 'Gland & Hormones', icon: 'fa-capsules' },
    { id: 'endoflife', label: 'End of Life', icon: 'fa-hands' },
  ];

  constructor(private router: Router) {}

  public navigation() {
    this.router.navigate([routes.consultation]);
  }
}
