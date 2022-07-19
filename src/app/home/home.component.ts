import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationsService } from '../shared/services/locations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  totalCities: number = 0;

  locationCitiesSubs!: Subscription;

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locationCitiesSubs = this.locationsService.getCities().subscribe({
      next: ({ numberOfCities }) => (this.totalCities = numberOfCities),
      error: () => (this.totalCities = 54),
    });
  }

  ngOnDestroy(): void {
    this.locationCitiesSubs.unsubscribe();
  }
}
