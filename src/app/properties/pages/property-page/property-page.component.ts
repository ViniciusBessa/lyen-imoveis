import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Property } from '../../../shared/models/property.model';
import { PropertiesService } from '../../properties.service';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css'],
})
export class PropertyPageComponent implements OnInit, OnDestroy {
  property!: Property;
  similarProperties: Property[] = [];
  isFavorited: boolean = false;
  isLoading: boolean = false;

  private propertySubs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.isLoading = true;
      this.propertiesService.getProperty(params['propertyId']).subscribe({
        next: (response) => {
          this.property = response.property;
          this.loadSimilarProperties();
        },
        error: () => this.router.navigate(['/error404']),
        complete: () => (this.isLoading = false),
      });
    });
  }

  ngOnDestroy(): void {
    this.propertySubs.unsubscribe();
  }

  private loadSimilarProperties(): void {
    this.propertiesService
      .getProperties({ city: this.property.location.city })
      .pipe(take(1))
      .subscribe({
        next: ({ properties }) =>
          (this.similarProperties = properties
            .filter((property) => property._id !== this.property._id)
            .slice(0, 4)),
      });
  }
}
