import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Tenant,
  Branding,
  Service,
  DurationOption,
  Location,
  Slot,
  PublicConfig,
} from '../models/tenant.types';
import { TenantResolutionService } from './tenant-resolution.service';

export interface BookingState {
  // Tenant data
  tenant: Tenant | null;
  branding: Branding | null;
  publicConfig: PublicConfig | null;

  // Booking data
  services: Service[];
  selectedService: Service | null;
  selectedDuration: DurationOption | null;
  locations: Location[];
  selectedLocation: Location | null;

  // Slot selection
  selectedDate: Date | null;
  selectedSlot: Slot | null;
  availableSlots: Slot[];

  // Form values
  formValues: { [key: string]: any };

  // Customer info
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Pet info
  petName: string;
  petSpecies: string;
  petBreed: string;
  petDob: Date | null;
  petSex: string;
  petConcerns: string[];
  petReason: string;

  // UI state
  currentStep: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  tenant: null,
  branding: null,
  publicConfig: null,
  services: [],
  selectedService: null,
  selectedDuration: null,
  locations: [],
  selectedLocation: null,
  selectedDate: new Date(),
  selectedSlot: null,
  availableSlots: [],
  formValues: {},
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  petName: '',
  petSpecies: 'Select Species',
  petBreed: '',
  petDob: new Date(),
  petSex: 'Male',
  petConcerns: [],
  petReason: '',
  currentStep: 1,
  isLoading: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class BookingStateService {
  private state = new BehaviorSubject<BookingState>(initialState);
  public state$ = this.state.asObservable();

  constructor(private tenantResolution: TenantResolutionService) {}

  // Getters
  getState(): BookingState {
    return this.state.getValue();
  }

  // Update entire state
  updateState(newState: Partial<BookingState>): void {
    this.state.next({
      ...this.getState(),
      ...newState,
    });
  }

  // Selectors
  select<T>(selector: (state: BookingState) => T): Observable<T> {
    return this.state$.pipe(map(selector));
  }

  // Specific setters
  setTenantData(tenant: Tenant, branding: Branding, publicConfig: PublicConfig): void {
    this.updateState({ tenant, branding, publicConfig });
  }

  setServices(services: Service[]): void {
    this.updateState({ services });
  }

  setSelectedService(service: Service | null): void {
    this.updateState({
      selectedService: service,
      // Reset duration when service changes
      selectedDuration:
        service?.duration_options?.find((d: { is_default: any }) => d.is_default) || null,
    });
  }

  setSelectedDuration(duration: DurationOption | null): void {
    this.updateState({ selectedDuration: duration });
  }

  setLocations(locations: Location[]): void {
    this.updateState({ locations });
  }

  setSelectedLocation(location: Location | null): void {
    this.updateState({ selectedLocation: location });
  }

  setSelectedDate(date: Date | null): void {
    this.updateState({ selectedDate: date });
  }

  setSelectedSlot(slot: Slot | null): void {
    this.updateState({ selectedSlot: slot });
  }

  setAvailableSlots(slots: Slot[]): void {
    this.updateState({ availableSlots: slots });
  }

  setFormValues(values: { [key: string]: any }): void {
    this.updateState({ formValues: values });
  }

  setCustomerInfo(name: string, email: string, phone: string): void {
    this.updateState({ customerName: name, customerEmail: email, customerPhone: phone });
  }

  setPetInfo(name: string, species: string, breed: string, dob: Date | null, sex: string): void {
    this.updateState({
      petName: name,
      petSpecies: species,
      petBreed: breed,
      petDob: dob,
      petSex: sex,
    });
  }

  setPetConcerns(concerns: string[]): void {
    this.updateState({ petConcerns: concerns });
  }

  setPetReason(reason: string): void {
    this.updateState({ petReason: reason });
  }

  setCurrentStep(step: number): void {
    this.updateState({ currentStep: step });
  }

  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  // Reset state
  resetState(): void {
    this.state.next(initialState);
  }

  // Get current booking summary
  getBookingSummary(): any {
    const state = this.getState();
    return {
      service: state.selectedService,
      duration: state.selectedDuration,
      date: state.selectedDate,
      slot: state.selectedSlot,
      location: state.selectedLocation,
      customer: {
        name: state.customerName,
        email: state.customerEmail,
        phone: state.customerPhone,
      },
      pet: {
        name: state.petName,
        species: state.petSpecies,
        breed: state.petBreed,
        dob: state.petDob,
        sex: state.petSex,
        concerns: state.petConcerns,
        reason: state.petReason,
      },
    };
  }

  // Check if booking can proceed to next step
  isStepValid(step: number): boolean {
    const state = this.getState();

    switch (step) {
      case 1: // Appointment Type
        return !!state.selectedService && !!state.selectedDuration;
      case 2: // Date & Time
        return !!state.selectedDate && !!state.selectedSlot;
      case 3: // Basic Information
        return (
          !!state.customerName &&
          !!state.customerEmail &&
          !!state.customerPhone &&
          !!state.petName &&
          state.petSpecies !== 'Select Species' &&
          !!state.petDob
        );
      case 4: // Payment
        return true; // Payment validation
      default:
        return false;
    }
  }
}
