import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { LocationsService } from 'src/app/shared/services/locations.service';
import { PropertyQuery } from '../../models/property-query.model';

@Component({
  selector: 'app-properties-filter',
  templateUrl: './properties-filter.component.html',
  styleUrls: ['./properties-filter.component.css'],
})
export class PropertiesFilterComponent implements OnInit, OnDestroy {
  @Output() filters = new EventEmitter<PropertyQuery>();
  filtersForm!: FormGroup;
  showFilters: boolean = false;
  states: string[] = [];
  cities: string[] = [];
  locationStatesSubs!: Subscription;
  locationCitiesSubs!: Subscription;

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.initForm();

    this.locationStatesSubs = this.locationsService
      .getStates()
      .subscribe({ next: ({ states }) => (this.states = states) });

    this.locationCitiesSubs = this.locationsService
      .getCities()
      .subscribe({ next: ({ cities }) => (this.cities = cities) });

    this.filtersForm.valueChanges.subscribe(() => {
      const minPriceControl = <FormControl>this.filtersForm.get('minPrice');
      const maxPriceControl = <FormControl>this.filtersForm.get('maxPrice');

      if (minPriceControl.value > maxPriceControl.value) {
        this.filtersForm.patchValue({ maxPrice: minPriceControl.value });
      }
    });
  }

  ngOnDestroy(): void {
    this.locationStatesSubs.unsubscribe();
    this.locationCitiesSubs.unsubscribe();
  }

  private initForm(): void {
    this.filtersForm = new FormGroup({
      minPrice: new FormControl<number>(100, [
        Validators.required,
        Validators.min(100),
        Validators.max(10000000),
      ]),
      maxPrice: new FormControl<number>(10000000, [
        Validators.required,
        Validators.min(100),
        Validators.max(10000000),
      ]),
      announceType: new FormControl<string | null>('sale', [
        Validators.required,
      ]),
      state: new FormControl<string>(''),
      city: new FormControl<string>(''),
      numberBedrooms: new FormControl<number>(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      numberBathrooms: new FormControl<number>(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      petAllowed: new FormControl<string>(''),
      hasGarage: new FormControl<string>(''),
    });
  }

  onSubmit(): void {
    if (this.filtersForm.valid) {
      const numericFilters = [
        `price>=${this.filtersForm.value.minPrice}`,
        `price<=${this.filtersForm.value.maxPrice}`,
        `numberBedrooms>=${this.filtersForm.value.numberBedrooms}`,
        `numberBathrooms>=${this.filtersForm.value.numberBathrooms}`,
      ];
      const propertyQuery: PropertyQuery = {
        announceType: this.filtersForm.value.announceType,
        state: this.filtersForm.value.state,
        city: this.filtersForm.value.city,
        numericFilters: numericFilters.join(','),
        petAllowed: this.filtersForm.value.petAllowed,
        hasGarage: this.filtersForm.value.hasGarage,
      };
      this.filters.emit(propertyQuery);
      this.onToggleFilters();
    }
  }

  onToggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onUpdateCities(): void {
    const state: string = this.filtersForm.get('state')?.value;
    this.locationsService
      .getCities(state)
      .pipe(take(1))
      .subscribe({ next: ({ cities }) => (this.cities = cities) });
  }
}
