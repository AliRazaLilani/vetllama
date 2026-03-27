import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

interface DataOption {
  value: string;
}

interface CheckboxOption {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-vet-registration',
  standalone: true,
  templateUrl: './vet-registration.component.html',
  styleUrls: ['./vet-registration.component.scss'],
  imports: [CommonModule, FormsModule, MatSelectModule],
})
export class VetRegistrationComponent {
  public firstName = '';
  public lastName = '';
  public email = '';

  public licenseNumber = '';
  public licenseType = '';
  public licenseState = '';
  public practiceYears = '';

  public prescriberStatus: 'can-prescribe' | 'non-prescriber' = 'can-prescribe';

  public selectedSpecies: string[] = [];
  public selectedSpecializations: string[] = [];

  public isSubmitted = false;

  public licenseTypes: DataOption[] = [
    { value: 'Select license type' },
    { value: 'DVM' },
    { value: 'BVSc' },
    { value: 'Other' },
  ];

  public states: DataOption[] = [
    { value: 'Select state' },
    { value: 'California' },
    { value: 'Texas' },
    { value: 'Florida' },
    { value: 'New York' },
  ];

  public practiceYearsOptions: DataOption[] = [
    { value: 'Less than 1 year' },
    { value: '1-5 years' },
    { value: '5-10 years' },
    { value: '10+ years' },
  ];

  public species: CheckboxOption[] = [
    { id: 'dog', label: 'Dog', icon: 'fa-dog' },
    { id: 'cat', label: 'Cat', icon: 'fa-cat' },
    // { id: 'horse', label: 'Horse', icon: 'fa-horse' },
    // { id: 'bird', label: 'Bird', icon: 'fa-dove' },
    // { id: 'rabbit', label: 'Rabbit', icon: 'fa-rabbit' },
    // { id: 'small-mammal', label: 'Small Mammal', icon: 'fa-paw' },
    // { id: 'reptile', label: 'Reptile', icon: 'fa-fan' },
    // { id: 'fish', label: 'Fish/Aquatic', icon: 'fa-fish' },
    // { id: 'farm', label: 'Farm Animal', icon: 'fa-cow' },
  ];

  public specializations: CheckboxOption[] = [
    { id: 'allergies', label: 'Allergies', icon: 'fa-allergies' },
    { id: 'skin', label: 'Skin & Coat', icon: 'fa-spa' },
    { id: 'ear', label: 'Ear', icon: 'fa-ear-deaf' },
    { id: 'eye', label: 'Eye', icon: 'fa-eye' },
    { id: 'urinary', label: 'Urinary', icon: 'fa-water' },
    { id: 'mites', label: 'Mites / Tick', icon: 'fa-bug' },
    { id: 'joint', label: 'Joint Health', icon: 'fa-bone' },
    { id: 'vomiting', label: 'Vomiting & Diarrhea', icon: 'fa-heartbeat' },
    { id: 'nutrition', label: 'Nutrition', icon: 'fa-apple-alt' },
    { id: 'obesity', label: 'Obesity', icon: 'fa-weight' },
    { id: 'dental', label: 'Dental', icon: 'fa-tooth' },
    { id: 'heart', label: 'Heart & Circulation', icon: 'fa-heart' },
    { id: 'seizure', label: 'Seizure & Brain', icon: 'fa-head-side-virus' },
    { id: 'respiratory', label: 'Respiratory', icon: 'fa-lungs' },
    { id: 'infection', label: 'Infection', icon: ' fa-bacteria' },
    { id: 'cancer', label: 'Cancer', icon: 'fa-radiation' },
    { id: 'hormones', label: 'Gland & Hormones', icon: 'fa-capsules' },
    { id: 'end-of-life', label: 'End of Life', icon: 'fa-hands' },
  ];

  submitRegistration(): void {
    this.isSubmitted = true;
  }

  toggleSpecies(id: string): void {
    const index = this.selectedSpecies.indexOf(id);
    if (index === -1) {
      this.selectedSpecies.push(id);
    } else {
      this.selectedSpecies.splice(index, 1);
    }
  }

  toggleSpecialization(id: string): void {
    const index = this.selectedSpecializations.indexOf(id);
    if (index === -1) {
      this.selectedSpecializations.push(id);
    } else {
      this.selectedSpecializations.splice(index, 1);
    }
  }
}
