import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyQuery } from '../../models/property-query.model';

@Component({
  selector: 'app-properties-filter',
  templateUrl: './properties-filter.component.html',
  styleUrls: ['./properties-filter.component.css'],
})
export class PropertiesFilterComponent implements OnInit {
  @Output() filters = new EventEmitter<PropertyQuery>();
  filtersForm!: FormGroup;
  showFilters: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
    this.filtersForm.valueChanges.subscribe(() => {
      const minPriceControl = <FormControl>this.filtersForm.get('minPrice');
      const maxPriceControl = <FormControl>this.filtersForm.get('maxPrice');

      if (minPriceControl.value > maxPriceControl.value) {
        this.filtersForm.patchValue({ maxPrice: minPriceControl.value });
      }
    });
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
      petAllowed: new FormControl<boolean>(false, [Validators.required]),
      hasGarage: new FormControl<boolean>(false, [Validators.required]),
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
        numericFilters: numericFilters.join(','),
        petAllowed: this.filtersForm.value.petAllowed,
        hasGarage: this.filtersForm.value.hasGarage,
      };
      this.filters.emit(propertyQuery);
    }
  }

  onToggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
