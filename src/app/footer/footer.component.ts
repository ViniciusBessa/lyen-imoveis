import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationsService } from '../shared/services/locations.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  cities: string[] = [
    'São Paulo',
    'Sorocaba',
    'Maringá',
    'Macapá',
    'Rio de Janeiro',
    'Salvador',
  ];

  private locationsCitiesSubs!: Subscription;

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locationsCitiesSubs = this.locationsService.getCities().subscribe({
      next: ({ cities }) => (this.cities = cities.slice(0, 6)),
      error: () =>
        (this.cities = [
          'São Paulo',
          'Sorocaba',
          'Maringá',
          'Macapá',
          'Rio de Janeiro',
          'Salvador',
        ]),
    });
  }

  ngOnDestroy(): void {
    this.locationsCitiesSubs.unsubscribe();
  }
}
