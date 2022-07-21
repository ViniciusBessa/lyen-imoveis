import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationsService } from '../shared/services/locations.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
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
