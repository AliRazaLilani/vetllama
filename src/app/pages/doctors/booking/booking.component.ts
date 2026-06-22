// src/app/pages/doctors/booking/booking.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { routes } from 'src/app/core/routes/routes';

// Import services
import { TenantApiService } from 'src/app/core/services/api/tenant-api.service';
import { BookingStateService } from 'src/app/core/services/booking-state.service';
import { TenantResolutionService } from 'src/app/core/services/tenant-resolution.service';

// Import models
import {
  Service,
  DurationOption,
  Location,
  Slot,
  Tenant,
  Branding,
} from 'src/app/core/models/tenant.types';

interface Concern {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule, RouterLink, MatSelectModule, BsDatepickerModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit, OnDestroy {
  routes = routes;
  // References to state
  selectedFieldSet = [1];
  bsInlineValue = new Date();
  minDate = new Date();
  isClinic = true;

  // Static data (keep for fallback)
  species = [
    { value: 'Select Species' },
    { value: 'Dog' },
    { value: 'Cat' },
    { value: 'Rabbit' },
    { value: 'Bird' },
    { value: 'Other' },
  ];

  concerns: Concern[] = [
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

  // Dynamic data from API
  services: Service[] = [];
  locations: Location[] = [];
  availableSlots: Slot[] = [];
  tenantData: Tenant | null = null;
  branding: Branding | null = null;
  publicConfig: any = null;

  // UI state
  isLoading = false;
  isBookingEnabled = true;
  errorMessage: string | null = null;

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Selected values (bound to state)
  selectedServiceId: number | null = null;
  selectedDurationId: number | null = null;
  selectedLocationId: number | null = null;
  selectedSlotTime = '';

  // Form fields (bound to state)
  name = '';
  email = '';
  phone = '';
  petName = '';
  selectedValue1 = 'Select Species';
  petBreed = '';
  petDob = new Date();
  petSex = 'Male';
  petReason = '';
  selectedConcerns: string[] = [];

  // Tenant context info for display
  tenantContext: any;

  constructor(
    private tenantApi: TenantApiService,
    private bookingState: BookingStateService,
    private tenantResolution: TenantResolutionService,
  ) {}

  ngOnInit(): void {
    // Get tenant context for display
    this.tenantContext = this.tenantResolution.getTenantContext();
    console.log('Tenant Context:', this.tenantContext);

    this.loadTenantData();
    this.subscribeToState();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private subscribeToState(): void {
    // Subscribe to state changes
    this.subscriptions.add(
      this.bookingState.state$.subscribe((state: any) => {
        // Update local variables from state
        this.services = state.services;
        this.locations = state.locations;
        this.availableSlots = state.availableSlots;
        this.tenantData = state.tenant;
        this.branding = state.branding;
        this.publicConfig = state.publicConfig;
        this.isBookingEnabled = state.publicConfig?.settings.booking_enabled ?? true;
        this.isLoading = state.isLoading;
        this.errorMessage = state.error;

        // Update selected IDs
        if (state.selectedService) {
          this.selectedServiceId = state.selectedService.id;
        }
        if (state.selectedDuration) {
          this.selectedDurationId = state.selectedDuration.id;
        }
        if (state.selectedLocation) {
          this.selectedLocationId = state.selectedLocation.id;
        }
        if (state.selectedSlot) {
          this.selectedSlotTime = state.selectedSlot.start_time.substring(0, 5);
        }

        // Update form fields from state
        this.name = state.customerName;
        this.email = state.customerEmail;
        this.phone = state.customerPhone;
        this.petName = state.petName;
        this.selectedValue1 = state.petSpecies;
        this.petBreed = state.petBreed;
        this.petDob = state.petDob || new Date();
        this.petSex = state.petSex;
        this.petReason = state.petReason;
        this.selectedConcerns = state.petConcerns;

        // Update current step
        this.selectedFieldSet = [state.currentStep];
      }),
    );
  }

  private loadTenantData(): void {
    this.bookingState.setLoading(true);

    // Try to resolve tenant from host
    this.tenantApi
      .resolveTenant()
      .pipe(finalize(() => this.bookingState.setLoading(false)))
      .subscribe({
        next: (response: {
          success: any;
          data: { tenant: any; branding: any; public_config: any };
          message: any;
        }) => {
          if (response.success) {
            const { tenant, branding, public_config } = response.data;
            this.bookingState.setTenantData(tenant, branding, public_config);

            // Check if booking is enabled
            if (!public_config.settings.booking_enabled) {
              this.bookingState.setError('Booking is currently disabled for this clinic.');
              return;
            }

            // Load services after tenant resolution
            this.loadServices();
            this.loadLocations();
          } else {
            this.bookingState.setError(response.message || 'Failed to resolve tenant.');
          }
        },
        error: (error: any) => {
          console.error('Error resolving tenant:', error);
          this.bookingState.setError('Could not connect to the server. Please try again.');
        },
      });
  }

  private loadServices(): void {
    this.tenantApi.getServices().subscribe({
      next: (response: { success: any; data: string | Service[]; message: any }) => {
        if (!response.success || !Array.isArray(response.data)) {
          console.error('Failed to load services:', response.message, response.data);
          return;
        }
        this.bookingState.setServices(response.data);

        // Auto-select first service if available
        if (response.data.length > 0) {
          this.bookingState.setSelectedService(response.data[0]);
        }
      },
      error: (error: any) => {
        console.error('Error loading services:', error);
        this.bookingState.setError('Failed to load services. Please refresh the page.');
      },
    });
  }

  private loadLocations(): void {
    this.tenantApi.getLocations().subscribe({
      next: (response: { success: any; data: string | Location[] }) => {
        if (!response.success || !Array.isArray(response.data)) {
          console.error('Invalid locations response', response.data);
          return;
        }

        this.bookingState.setLocations(response.data);
        if (response.data.length > 0) {
          this.bookingState.setSelectedLocation(response.data[0]);
        }
      },
      error: (error: any) => {
        console.error('Error loading locations:', error);
      },
    });
  }

  private loadAvailableSlots(): void {
    const state = this.bookingState.getState();
    if (!state.selectedService || !state.selectedDuration || !state.selectedDate) {
      return;
    }

    this.bookingState.setLoading(true);
    const dateStr = this.formatDate(state.selectedDate);

    this.tenantApi
      .getAvailableSlots({
        service_id: state.selectedService.id,
        duration_id: state.selectedDuration.id,
        date: dateStr,
        location_id: state.selectedLocation?.id,
      })
      .pipe(finalize(() => this.bookingState.setLoading(false)))
      .subscribe({
        next: (response: { success: any; data: any; message: any }) => {
          if (response.success) {
            this.bookingState.setAvailableSlots(response.data);
          } else {
            console.error('Failed to load slots:', response.message);
            this.bookingState.setAvailableSlots([]);
          }
        },
        error: (error: any) => {
          console.error('Error loading slots:', error);
          this.bookingState.setAvailableSlots([]);
        },
      });
  }

  // Helper methods
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Get available slots for display
  getMorningSlots(): string[] {
    return this.availableSlots
      .filter((slot) => {
        const hour = parseInt(slot.start_time.split(':')[0]);
        return hour >= 6 && hour < 12;
      })
      .map((slot) => slot.start_time.substring(0, 5));
  }

  getAfternoonSlots(): string[] {
    return this.availableSlots
      .filter((slot) => {
        const hour = parseInt(slot.start_time.split(':')[0]);
        return hour >= 12 && hour < 18;
      })
      .map((slot) => slot.start_time.substring(0, 5));
  }

  getEveningSlots(): string[] {
    return this.availableSlots
      .filter((slot) => {
        const hour = parseInt(slot.start_time.split(':')[0]);
        return hour >= 18;
      })
      .map((slot) => slot.start_time.substring(0, 5));
  }

  // Check if a slot is disabled
  isSlotDisabled(slotTime: string): boolean {
    const now = new Date();
    const selectedDate = new Date(this.bsInlineValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    // If date is in the past
    if (selectedDate < today) {
      return true;
    }

    // If date is today, check if slot is in the past
    if (selectedDate.getTime() === today.getTime()) {
      const [hours, minutes] = slotTime.split(':').map(Number);
      const slotDate = new Date(selectedDate);
      slotDate.setHours(hours, minutes, 0, 0);
      return slotDate < now;
    }

    return false;
  }

  // Event handlers
  onServiceSelect(serviceId: number): void {
    const service = this.services.find((s) => s.id === serviceId);
    if (service) {
      this.bookingState.setSelectedService(service);
      // Clear existing slots when service changes
      this.bookingState.setAvailableSlots([]);
      this.bookingState.setSelectedSlot(null);
    }
  }

  onDurationSelect(durationId: number): void {
    const state = this.bookingState.getState();
    if (state.selectedService) {
      const duration = state.selectedService.duration_options.find(
        (d: { id: number }) => d.id === durationId,
      );
      if (duration) {
        this.bookingState.setSelectedDuration(duration);
        // Clear slots when duration changes
        this.bookingState.setAvailableSlots([]);
        this.bookingState.setSelectedSlot(null);
      }
    }
  }

  onDateSelect(date: Date): void {
    this.bookingState.setSelectedDate(date);
    this.bookingState.setSelectedSlot(null);
    this.bsInlineValue = date;

    // Load available slots for selected date
    this.loadAvailableSlots();
  }

  onSlotSelect(slotTime: string): void {
    const slot = this.availableSlots.find((s) => s.start_time.substring(0, 5) === slotTime);
    if (slot) {
      this.bookingState.setSelectedSlot(slot);
      this.selectedSlotTime = slotTime;
    }
  }

  onLocationSelect(locationId: number): void {
    const location = this.locations.find((l) => l.id === locationId);
    if (location) {
      this.bookingState.setSelectedLocation(location);
      // Reload slots for new location
      if (this.bookingState.getState().selectedDate) {
        this.loadAvailableSlots();
      }
    }
  }

  // Navigation handlers
  goToStep(step: number): void {
    const state = this.bookingState.getState();

    // Check if previous steps are valid when going forward
    if (step > state.currentStep) {
      // Validate current step
      if (!this.bookingState.isStepValid(state.currentStep)) {
        this.bookingState.setError('Please complete all required fields before proceeding.');
        return;
      }
    }

    this.bookingState.setCurrentStep(step);
    this.selectedFieldSet = [step];
    this.bookingState.setError(null);
  }

  nextStep(): void {
    const currentStep = this.bookingState.getState().currentStep;
    if (this.bookingState.isStepValid(currentStep)) {
      const nextStep = Math.min(currentStep + 1, 5);
      this.goToStep(nextStep);
    } else {
      this.bookingState.setError('Please complete all required fields.');
    }
  }

  prevStep(): void {
    const currentStep = this.bookingState.getState().currentStep;
    const prevStep = Math.max(currentStep - 1, 1);
    this.goToStep(prevStep);
  }

  // Form field update handlers
  updateCustomerInfo(): void {
    this.bookingState.setCustomerInfo(this.name, this.email, this.phone);
  }

  updatePetInfo(): void {
    this.bookingState.setPetInfo(
      this.petName,
      this.selectedValue1,
      this.petBreed,
      this.petDob,
      this.petSex,
    );
  }

  updateConcerns(concernId: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const updatedConcerns = checkbox.checked
      ? [...this.selectedConcerns, concernId]
      : this.selectedConcerns.filter((id) => id !== concernId);

    this.selectedConcerns = updatedConcerns;
    this.bookingState.setPetConcerns(updatedConcerns);
  }

  updateReason(): void {
    this.bookingState.setPetReason(this.petReason);
  }

  // Booking submission
  submitBooking(): void {
    if (!this.bookingState.isStepValid(4)) {
      this.bookingState.setError('Please complete all required fields.');
      return;
    }

    // TODO: Implement booking submission API
    const bookingData = {
      ...this.bookingState.getBookingSummary(),
      tenant_context: this.tenantContext,
    };

    console.log('Submitting booking with tenant context:', bookingData);
    // Show success or redirect
    this.goToStep(5);
  }

  // Get selected service for display
  getSelectedServiceName(): string {
    const service = this.bookingState.getState().selectedService;
    return service ? service.name : 'Not selected';
  }

  getSelectedDurationText(): string {
    const duration = this.bookingState.getState().selectedDuration;
    return duration ? `${duration.duration_minutes} mins` : '';
  }

  getSelectedServicePrice(): string {
    const duration = this.bookingState.getState().selectedDuration;
    return duration ? `${duration.currency} ${duration.price}` : '$0';
  }

  // Toggle clinic/telehealth
  showClinic(): void {
    this.isClinic = true;
  }

  offClinic(): void {
    this.isClinic = false;
  }
}
