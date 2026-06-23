// src/app/pages/doctors/booking/booking.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';
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
  FormConfig,
  FormSection,
  FormField,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  // Form configuration
  formConfig: FormConfig | null = null;
  formSections: FormSection[] = [];

  // Dynamic form values
  formValues: { [key: string]: any } = {};

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

  // Selected properties
  selectedService: Service | null = null;
  selectedDuration: DurationOption | null = null;
  selectedDate: Date | null = null;
  selectedLocation: Location | null = null;
  selectedSlot: Slot | null = null;

  // Payment related properties
  selectedPaymentType: string = 'card';
  isProcessingPayment = false;
  bookingNumber: string = '';
  bookingId: number | null = null;
  bookingData: any = null;
  bookingOrderNumber: string = '';

  // Add to the existing properties
  cardHolderName: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCvv: string = '';

  // Tenant context info for display
  tenantContext: any;

  // Track last loaded slot params to prevent duplicate calls
  private lastSlotParams: {
    serviceId: number;
    durationId: number;
    date: string;
    locationId?: number;
  } | null = null;

  constructor(
    private tenantApi: TenantApiService,
    private bookingState: BookingStateService,
    private tenantResolution: TenantResolutionService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Get tenant context for display
    this.tenantContext = this.tenantResolution.getTenantContext();
    console.log('Tenant Context:', this.tenantContext);

    // Set initial date
    this.selectedDate = new Date();
    this.bsInlineValue = new Date();

    this.loadTenantData();
    this.subscribeToState();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private subscribeToState(): void {
    // Subscribe to state changes with debounce to prevent rapid updates
    this.subscriptions.add(
      this.bookingState.state$
        .pipe(
          debounceTime(50),
          distinctUntilChanged((prev, curr) => {
            return (
              prev.selectedService === curr.selectedService &&
              prev.selectedDuration === curr.selectedDuration &&
              prev.selectedDate === curr.selectedDate &&
              prev.selectedLocation === curr.selectedLocation &&
              prev.availableSlots === curr.availableSlots &&
              prev.isLoading === curr.isLoading
            );
          }),
        )
        .subscribe((state: any) => {
          // Update local variables from state
          this.services = state.services || [];
          this.locations = state.locations || [];
          this.availableSlots = Array.isArray(state.availableSlots) ? state.availableSlots : [];
          this.tenantData = state.tenant;
          this.branding = state.branding;
          this.publicConfig = state.publicConfig;
          this.isBookingEnabled = state.publicConfig?.settings.booking_enabled ?? true;
          this.isLoading = state.isLoading;
          this.errorMessage = state.error;

          // Update selected properties
          this.selectedService = state.selectedService;
          this.selectedDuration = state.selectedDuration;
          this.selectedDate = state.selectedDate || this.bsInlineValue;
          this.selectedLocation = state.selectedLocation;
          this.selectedSlot = state.selectedSlot;

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
            this.selectedSlotTime = state.selectedSlot.start_time?.substring(0, 5) || '';
          }

          // Update form fields from state
          this.formValues = state.formValues || {};
          this.name = state.customerName;
          this.email = state.customerEmail;
          this.phone = state.customerPhone;
          this.petName = state.petName;
          this.selectedValue1 = state.petSpecies;
          this.petBreed = state.petBreed;
          this.petDob = state.petDob || new Date();
          this.petSex = state.petSex;
          this.petReason = state.petReason;
          this.selectedConcerns = state.petConcerns || [];

          // Update current step
          this.selectedFieldSet = [state.currentStep];
          this.cdr.detectChanges();
        }),
    );

    // Separate subscription for slot loading with debounce
    this.subscriptions.add(
      this.bookingState.state$
        .pipe(
          debounceTime(100),
          filter((state) => {
            return !!state.selectedService && !!state.selectedDuration && !!state.selectedDate;
          }),
          distinctUntilChanged((prev, curr) => {
            const prevParams = {
              serviceId: prev.selectedService?.id,
              durationId: prev.selectedDuration?.id,
              date: prev.selectedDate ? this.formatDate(prev.selectedDate) : null,
              locationId: prev.selectedLocation?.id,
            };
            const currParams = {
              serviceId: curr.selectedService?.id,
              durationId: curr.selectedDuration?.id,
              date: curr.selectedDate ? this.formatDate(curr.selectedDate) : null,
              locationId: curr.selectedLocation?.id,
            };
            return JSON.stringify(prevParams) === JSON.stringify(currParams);
          }),
        )
        .subscribe((state) => {
          this.loadAvailableSlotsIfNeeded(state);
        }),
    );
  }

  private loadTenantData(): void {
    this.bookingState.setLoading(true);

    this.tenantApi
      .resolveTenant()
      .pipe(finalize(() => this.bookingState.setLoading(false)))
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const { tenant, branding, public_config } = response.data;
            this.bookingState.setTenantData(tenant, branding, public_config);

            if (!public_config.settings.booking_enabled) {
              this.bookingState.setError('Booking is currently disabled for this clinic.');
              return;
            }

            this.loadServices();
            this.loadLocations();
            this.loadFormConfig();
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
      next: (response: any) => {
        console.log('📥 Services Response:', response);

        if (!response.success || !Array.isArray(response.data)) {
          console.error('Failed to load services:', response.message);
          this.bookingState.setServices([]);
          return;
        }

        this.bookingState.setServices(response.data);

        if (response.data.length > 0) {
          const firstService = response.data[0];
          this.bookingState.setSelectedService(firstService);

          const defaultDuration = firstService.duration_options?.find((d: any) => d.is_default);
          if (defaultDuration) {
            this.bookingState.setSelectedDuration(defaultDuration);
          } else if (firstService.duration_options?.length > 0) {
            this.bookingState.setSelectedDuration(firstService.duration_options[0]);
          }
        }
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading services:', error);
        this.bookingState.setError('Failed to load services. Please refresh the page.');
        this.cdr.detectChanges();
      },
    });
  }

  private loadLocations(): void {
    this.tenantApi.getLocations().subscribe({
      next: (response: any) => {
        console.log('📥 Locations Response:', response);

        if (!response.success || !Array.isArray(response.data)) {
          console.error('Invalid locations response', response);
          this.bookingState.setLocations([]);
          return;
        }

        this.bookingState.setLocations(response.data);
        if (response.data.length > 0) {
          this.bookingState.setSelectedLocation(response.data[0]);
        }
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading locations:', error);
        this.bookingState.setLocations([]);
      },
    });
  }

  // Add this method to load form configuration
  private loadFormConfig(): void {
    this.tenantApi.getFormConfig().subscribe({
      next: (response: any) => {
        console.log('📥 Form Config Response:', response);

        if (response.success && response.data) {
          this.formConfig = response.data;
          this.formSections = response.data.schema.sections || [];

          // Initialize form values from state or defaults
          this.initializeFormValues();
          this.cdr.detectChanges();
        } else {
          console.error('Failed to load form config:', response.message);
        }
      },
      error: (error: any) => {
        console.error('Error loading form config:', error);
      },
    });
  }

  // Add this method to initialize form values
  private initializeFormValues(): void {
    const state = this.bookingState.getState();

    // If we already have form values in state, use them
    if (state.formValues && Object.keys(state.formValues).length > 0) {
      this.formValues = { ...state.formValues };
      return;
    }

    // Initialize with default values from the form config
    this.formSections.forEach((section) => {
      section.fields.forEach((field) => {
        // Set default values based on field type
        switch (field.type) {
          case 'checkbox':
            this.formValues[field.id] = [];
            break;
          case 'radio':
          case 'select':
            this.formValues[field.id] = field.options?.[0] || '';
            break;
          case 'date':
            this.formValues[field.id] = new Date();
            break;
          default:
            this.formValues[field.id] = '';
        }
      });
    });

    // Update state with initialized values
    this.bookingState.updateState({ formValues: this.formValues });
  }

  // Add this method to update form values
  updateFormValue(fieldId: string, value: any): void {
    this.formValues[fieldId] = value;
    this.bookingState.updateState({ formValues: this.formValues });

    // Also update specific fields in state for validation
    this.syncFormValuesToState();
  }

  // Add this method to sync form values to state
  private syncFormValuesToState(): void {
    // Map form values to state properties for validation
    const state = this.bookingState.getState();

    // Map common fields
    if (this.formValues['name'] !== undefined) {
      this.bookingState.setCustomerInfo(
        this.formValues['name'] || '',
        this.formValues['email'] || '',
        this.formValues['phone_number'] || '',
      );
    }

    if (this.formValues['pet_name'] !== undefined) {
      this.bookingState.setPetInfo(
        this.formValues['pet_name'] || '',
        this.formValues['species'] || 'Select Species',
        this.formValues['breed'] || '',
        this.formValues['date_of_birth'] || null,
        this.formValues['sex'] || 'Male',
      );
    }

    if (this.formValues['concerns'] !== undefined) {
      this.bookingState.setPetConcerns(this.formValues['concerns'] || []);
    }

    if (this.formValues['reason_for_appointment'] !== undefined) {
      this.bookingState.setPetReason(this.formValues['reason_for_appointment'] || '');
    }
  }

  // Add this method to prepare booking data
  private prepareBookingData(): any {
    const state = this.bookingState.getState();
    const slot = state.selectedSlot;

    // Get slot times
    const startsAt = slot?.starts_at || slot?.start_time || '';
    const endsAt = slot?.ends_at || slot?.end_time || '';
    const timezone = slot?.timezone || 'America/Los_Angeles';

    // Calculate price (use actual values from selected duration)
    const duration = state.selectedDuration;
    const price = duration ? parseFloat(duration.price) : 0;

    // Get form values
    const formValues = state.formValues || {};

    // Prepare fields_json from form values
    const fieldsJson = { ...formValues };

    return {
      service_id: state.selectedService?.id || 0,
      location_id: state.selectedLocation?.id,
      duration_id: state.selectedDuration?.id,
      price: price,
      tax: 0, // Will be calculated by backend
      discount: 0,
      date: this.formatDate(state.selectedDate || new Date()),
      slot_starts_at: startsAt,
      slot_ends_at: endsAt,
      slot_timezone: timezone,
      payment_type: this.selectedPaymentType,
      name: formValues['name'] || '',
      email: formValues['email'] || '',
      phone_number: formValues['phone_number'] || '',
      fields_json: fieldsJson,
    };
  }

  // isStepValid method to use dynamic form validation
  isStepValid(step: number): boolean {
    const state = this.bookingState.getState();

    switch (step) {
      case 1: // Appointment Type
        return !!state.selectedService && !!state.selectedDuration;
      case 2: // Date & Time
        return !!state.selectedDate && !!state.selectedSlot;
      case 3: // Basic Information
        return this.validateForm();
      case 4: // Payment
        // Validate payment fields
        return this.validatePayment();
      default:
        return false;
    }
  }

  // Add payment validation
  private validatePayment(): boolean {
    // Basic validation for card fields
    if (this.selectedPaymentType === 'card') {
      return !!this.cardHolderName && !!this.cardNumber && !!this.cardExpiry && !!this.cardCvv;
    }
    return true; // PayPal/Stripe validation would be handled by their SDKs
  }

  // Add method to reset booking
  resetBooking(): void {
    // Reset state
    this.bookingState.resetState();

    // Reset component properties
    this.selectedFieldSet = [1];
    this.bsInlineValue = new Date();
    this.selectedSlotTime = '';
    this.selectedServiceId = null;
    this.selectedDurationId = null;
    this.selectedLocationId = null;
    this.bookingData = null;
    this.bookingNumber = '';
    this.bookingOrderNumber = '';
    this.isProcessingPayment = false;
    this.isClinic = true;

    // Reset form values
    this.formValues = {};
    this.cardHolderName = '';
    this.cardNumber = '';
    this.cardExpiry = '';
    this.cardCvv = '';
    this.name = '';
    this.email = '';
    this.phone = '';
    this.petName = '';
    this.selectedValue1 = 'Select Species';
    this.petBreed = '';
    this.petDob = new Date();
    this.petSex = 'Male';
    this.petReason = '';
    this.selectedConcerns = [];

    // Reset slot params
    this.lastSlotParams = null;

    // Reset selected properties
    this.selectedService = null;
    this.selectedDuration = null;
    this.selectedDate = new Date();
    this.selectedLocation = null;
    this.selectedSlot = null;
    this.services = [];
    this.locations = [];
    this.availableSlots = [];
    this.tenantData = null;
    this.branding = null;
    this.publicConfig = null;
    this.errorMessage = null;

    this.cdr.detectChanges();
  }

  // Add this method to validate the form
  private validateForm(): boolean {
    // Check if all required fields are filled
    for (const section of this.formSections) {
      for (const field of section.fields) {
        if (field.required) {
          const value = this.formValues[field.id];

          // Check if value is empty
          if (value === undefined || value === null || value === '') {
            return false;
          }

          // Check if array is empty (for checkboxes)
          if (Array.isArray(value) && value.length === 0) {
            return false;
          }

          // Check if select has default value
          if (field.type === 'select' && value === field.options?.[0]) {
            // If the first option is a placeholder like "Select Species"
            if (field.id === 'species' && value === 'Select Species') {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  private loadAvailableSlotsIfNeeded(state: any): void {
    if (!state.selectedService || !state.selectedDuration || !state.selectedDate) {
      return;
    }

    const dateStr = this.formatDate(state.selectedDate);
    const currentParams = {
      serviceId: state.selectedService.id,
      durationId: state.selectedDuration.id,
      date: dateStr,
      locationId: state.selectedLocation?.id,
    };

    if (this.lastSlotParams) {
      const prev = this.lastSlotParams;
      const same =
        prev.serviceId === currentParams.serviceId &&
        prev.durationId === currentParams.durationId &&
        prev.date === currentParams.date &&
        prev.locationId === currentParams.locationId;

      if (same) {
        console.log('⏭️ Skipping duplicate slot load');
        return;
      }
    }

    this.lastSlotParams = currentParams;
    this.loadAvailableSlots(state);
  }

  private loadAvailableSlots(state: any): void {
    console.log('🔄 Loading slots for:', {
      service: state.selectedService?.name,
      duration: state.selectedDuration?.duration_minutes,
      date: state.selectedDate,
    });

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
        next: (response: any) => {
          console.log('📥 Slots API Response:', response);

          let slotsArray: Slot[] = [];

          if (response.success && response.data) {
            // ✅ Check if response.data.slots exists and is an array
            if (response.data.slots && Array.isArray(response.data.slots)) {
              slotsArray = response.data.slots;
              console.log('✅ Found slots in response.data.slots:', slotsArray.length);
            }
            // Fallback: if response.data is an array directly
            else if (Array.isArray(response.data)) {
              slotsArray = response.data;
              console.log('✅ Found slots in response.data (array):', slotsArray.length);
            }
            // Fallback: if response.data has items array
            else if (response.data.items && Array.isArray(response.data.items)) {
              slotsArray = response.data.items;
              console.log('✅ Found slots in response.data.items:', slotsArray.length);
            }
          }

          console.log('✅ Processed slots:', slotsArray);
          this.bookingState.setAvailableSlots(slotsArray);
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.error('Error loading slots:', error);
          this.bookingState.setAvailableSlots([]);
          this.cdr.detectChanges();
        },
      });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Get available slots for display - with safety checks
  getMorningSlots(): string[] {
    const slots = Array.isArray(this.availableSlots) ? this.availableSlots : [];
    const morningSlots = slots
      .filter((slot) => {
        // Extract hour from starts_at
        const startTime = slot.starts_at || slot.start_time || '';
        const hour = parseInt(startTime.split('T')[1]?.split(':')[0] || '0');
        return hour >= 6 && hour < 12;
      })
      .map((slot) => {
        // Extract time from starts_at (HH:MM format)
        const startTime = slot.starts_at || slot.start_time || '';
        return startTime.split('T')[1]?.substring(0, 5) || '';
      })
      .filter((time) => time !== ''); // Remove empty strings

    console.log('🌅 Morning slots:', morningSlots);
    return morningSlots;
  }

  getAfternoonSlots(): string[] {
    const slots = Array.isArray(this.availableSlots) ? this.availableSlots : [];
    const afternoonSlots = slots
      .filter((slot) => {
        const startTime = slot.starts_at || slot.start_time || '';
        const hour = parseInt(startTime.split('T')[1]?.split(':')[0] || '0');
        return hour >= 12 && hour < 18;
      })
      .map((slot) => {
        const startTime = slot.starts_at || slot.start_time || '';
        return startTime.split('T')[1]?.substring(0, 5) || '';
      })
      .filter((time) => time !== '');

    console.log('☀️ Afternoon slots:', afternoonSlots);
    return afternoonSlots;
  }

  getEveningSlots(): string[] {
    const slots = Array.isArray(this.availableSlots) ? this.availableSlots : [];
    const eveningSlots = slots
      .filter((slot) => {
        const startTime = slot.starts_at || slot.start_time || '';
        const hour = parseInt(startTime.split('T')[1]?.split(':')[0] || '0');
        return hour >= 18;
      })
      .map((slot) => {
        const startTime = slot.starts_at || slot.start_time || '';
        return startTime.split('T')[1]?.substring(0, 5) || '';
      })
      .filter((time) => time !== '');

    console.log('🌙 Evening slots:', eveningSlots);
    return eveningSlots;
  }

  isSlotDisabled(slotTime: string): boolean {
    const now = new Date();
    const selectedDate = new Date(this.bsInlineValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) return true;

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
      this.lastSlotParams = null;
      this.bookingState.setSelectedService(service);
      this.bookingState.setAvailableSlots([]);
      this.bookingState.setSelectedSlot(null);

      const defaultDuration = service.duration_options?.find((d: any) => d.is_default);
      if (defaultDuration) {
        this.bookingState.setSelectedDuration(defaultDuration);
      } else if (service.duration_options?.length > 0) {
        this.bookingState.setSelectedDuration(service.duration_options[0]);
      }
    }
  }

  onDurationSelect(durationId: number): void {
    const state = this.bookingState.getState();
    if (state.selectedService) {
      const duration = state.selectedService.duration_options.find(
        (d: { id: number }) => d.id === durationId,
      );
      if (duration) {
        this.lastSlotParams = null;
        this.bookingState.setSelectedDuration(duration);
        this.bookingState.setAvailableSlots([]);
        this.bookingState.setSelectedSlot(null);
      }
    }
  }

  onDateSelect(date: Date): void {
    console.log('📅 Date selected:', date);
    this.lastSlotParams = null;
    this.bookingState.setSelectedDate(date);
    this.bookingState.setSelectedSlot(null);
    this.bsInlineValue = date;
  }

  onSlotSelect(slotTime: string): void {
    const slots = Array.isArray(this.availableSlots) ? this.availableSlots : [];
    const slot = slots.find((s) => {
      const startTime = s.starts_at || s.start_time || '';
      return startTime.split('T')[1]?.substring(0, 5) === slotTime;
    });

    if (slot) {
      this.bookingState.setSelectedSlot(slot);
      this.selectedSlotTime = slotTime;
      console.log('✅ Slot selected:', slot);
    }
  }

  onLocationSelect(locationId: number): void {
    const location = this.locations.find((l) => l.id === locationId);
    if (location) {
      this.lastSlotParams = null;
      this.bookingState.setSelectedLocation(location);
    }
  }

  // Navigation handlers
  goToStep(step: number): void {
    const state = this.bookingState.getState();

    if (step > state.currentStep) {
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

  submitBooking(): void {
    if (!this.bookingState.isStepValid(4)) {
      this.bookingState.setError('Please complete all required fields.');
      return;
    }

    this.isProcessingPayment = true;
    this.bookingState.setLoading(true);

    const bookingData = this.prepareBookingData();

    console.log('📤 Submitting booking with data:', bookingData);

    this.tenantApi.createBooking(bookingData).subscribe({
      next: (response: any) => {
        console.log('✅ Booking response:', response);

        if (response.success && response.data) {
          // Store the entire booking data
          this.bookingData = response.data;

          // Store order number from response
          this.bookingOrderNumber = response.data.order_number || '';
          this.bookingNumber = response.data.order_number || response.data.id?.toString() || '';
          this.bookingState.setError(null);
          this.goToStep(5);
        } else {
          this.bookingState.setError(response.message || 'Failed to create booking.');
        }
        this.isProcessingPayment = false;
        this.bookingState.setLoading(false);
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('❌ Error creating booking:', error);
        this.bookingState.setError(error.message || 'Failed to create booking. Please try again.');
        this.isProcessingPayment = false;
        this.bookingState.setLoading(false);
        this.cdr.detectChanges();
      },
    });
  }

  // Getters for template
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

  // ✅ FIX: Make bookingState accessible to template
  getBookingState(): BookingStateService {
    return this.bookingState;
  }

  getDurationOptions(): DurationOption[] {
    return this.selectedService?.duration_options || [];
  }

  // ✅ ADD: Check if slots should be shown
  shouldShowSlots(): boolean {
    const slots = Array.isArray(this.availableSlots) ? this.availableSlots : [];
    return slots.length > 0 && !!this.selectedDate;
  }

  // Toggle clinic/telehealth
  showClinic(): void {
    this.isClinic = true;
  }

  offClinic(): void {
    this.isClinic = false;
  }

  getFieldValue(fieldId: string): any {
    return this.formValues[fieldId] || '';
  }

  isFieldValid(fieldId: string): boolean {
    const field = this.findField(fieldId);
    if (!field) return true;

    const value = this.formValues[fieldId];
    if (field.required) {
      if (value === undefined || value === null || value === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
    }
    return true;
  }

  isFieldInvalid(fieldId: string): boolean {
    return !this.isFieldValid(fieldId);
  }

  findField(fieldId: string): FormField | null {
    for (const section of this.formSections) {
      const field = section.fields.find((f) => f.id === fieldId);
      if (field) return field;
    }
    return null;
  }

  isCheckboxChecked(fieldId: string, option: string): boolean {
    const value = this.formValues[fieldId] || [];
    return Array.isArray(value) && value.includes(option);
  }

  toggleCheckbox(fieldId: string, option: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const currentValues = this.formValues[fieldId] || [];

    if (checkbox.checked) {
      this.updateFormValue(fieldId, [...currentValues, option]);
    } else {
      this.updateFormValue(
        fieldId,
        currentValues.filter((v: string) => v !== option),
      );
    }
  }

  getTextareaLength(fieldId: string): number {
    const value = this.formValues[fieldId] || '';
    return value.length;
  }

  isTextareaMaxReached(fieldId: string): boolean {
    const field = this.findField(fieldId);
    if (!field || !field.max_characters) return false;
    return this.getTextareaLength(fieldId) >= field.max_characters;
  }

  formatDateDisplay(date: any): string {
    if (!date) return 'N/A';

    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return String(date);
    }
  }

  formatTimeDisplay(datetime: string): string {
    if (!datetime) return '';

    try {
      const d = new Date(datetime);
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return datetime.substring(0, 5);
    }
  }
}
