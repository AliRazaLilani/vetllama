import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MessageService } from 'primeng/api';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';
import { TenantAuthService } from 'src/app/core/services/tenant-auth.service';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';

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
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
})
export class VetRegistrationComponent {
  registrationForm!: FormGroup;
  isLoading = false;
  apiErrors: Record<string, string[]> = {};

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

  constructor(
    private fb: FormBuilder,
    private tenantAuthService: TenantAuthService,
    private authStorage: AuthStorageService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required, Validators.minLength(3)],
        lastName: ['', Validators.required, Validators.minLength(3)],
        displayName: ['', Validators.required, Validators.minLength(3)],
        businessName: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.pattern(/^\+?[0-9]{10,15}$/)]],
        desiredSubdomain: ['', [Validators.pattern(/^[a-z0-9-]+$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: ['', Validators.required],
        acceptedTerms: [false, Validators.requiredTrue],
        // onboarding fields
        licenseType: [''],
        licenseNumber: [''],
        licenseState: [''],
        practiceYears: [''],
        prescriberStatus: ['can-prescribe'],
      },
      {
        validators: passwordMatchValidator,
      },
    );
  }

  get f() {
    return this.registrationForm.controls;
  }

  submitRegistration(): void {
    // if (this.registrationForm.invalid) {
    //   this.registrationForm.markAllAsTouched();
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Validation Error',
    //     detail: 'Please fix all form errors',
    //   });
    //   return;
    // }

    this.isLoading = true;
    const form = this.registrationForm.value;

    const payload = {
      owner_name: `${form.firstName} ${form.lastName}`,
      display_name: form.displayName,
      business_name: form.businessName,
      email: form.email,
      password: form.password,
      password_confirmation: form.passwordConfirmation,
      accepted_terms: form.acceptedTerms,
      phone: form.phone,
      desired_subdomain: form.desiredSubdomain,
    };

    console.log(payload);
    this.isSubmitted = true; // Temporary until API is ready

    // this.tenantAuthService.registerTenant(payload).subscribe({
    //   next: (response) => {
    //     this.isLoading = false;
    //     this.authStorage.setToken(response.data.access_token);
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: response.message,
    //     });
    //     this.isSubmitted = true;
    //   },

    //   error: (error) => {
    //     this.isLoading = false;
    //     if (error.status === 422 && error.error.errors) {
    //       this.apiErrors = error.error.errors;
    //       Object.values(error.error.errors)
    //         .flat()
    //         .forEach((message: any) => {
    //           this.messageService.add({
    //             severity: 'error',
    //             summary: 'Validation Error',
    //             detail: String(message),
    //           });
    //         });
    //     } else {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: error?.error?.message || 'Something went wrong',
    //       });
    //     }
    //   },
    // });
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
