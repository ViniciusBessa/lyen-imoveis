import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  forSale: boolean = true;
  cities: string[] = [];

  locationsSubs!: Subscription;

  constructor(
    private locationsService: LocationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationsSubs = this.locationsService
      .getCities()
      .subscribe({ next: ({ cities }) => (this.cities = cities) });

    this.initForm();
  }

  ngOnDestroy(): void {
    this.locationsSubs.unsubscribe();
  }

  private initForm(): void {
    this.searchForm = new FormGroup({
      city: new FormControl<string>(''),
      price: new FormControl<number | null>(50000, Validators.required),
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
    });
  }

  onSetForSale(): void {
    if (!this.forSale) {
      this.forSale = true;
      this.searchForm.patchValue({ price: 50000 });
    }
  }

  onSetForRent(): void {
    if (this.forSale) {
      this.forSale = false;
      this.searchForm.patchValue({ price: 500 });
    }
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const city = this.searchForm.value.city;
      const numericFilters = [
        `price<=${this.searchForm.value.price}`,
        `numberBedrooms>=${this.searchForm.value.numberBedrooms}`,
        `numberBathrooms>=${this.searchForm.value.numberBathrooms}`,
      ];
      this.router.navigate(['/properties', 'search'], {
        queryParams: {
          city,
          numericFilters: numericFilters.join(','),
          announceType: this.forSale ? 'sale' : 'rent',
        },
      });
    }
  }
}
