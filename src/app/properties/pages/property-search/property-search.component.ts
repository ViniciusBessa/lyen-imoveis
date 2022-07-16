import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PropertyQuery } from '../../models/property-query.model';
import { Property } from '../../../shared/models/property.model';
import { PropertiesService } from '../../properties.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css'],
})
export class PropertySearchComponent implements OnInit, OnDestroy {
  properties: Property[] = [];
  totalPages: number = 1;
  currentPage: number = 1;
  isLoading: boolean = false;
  sortingText: string = 'Mais recentes';

  private propertiesCountSubs!: Subscription;
  private propertiesSubs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.isLoading = true;
      this.currentPage = +params['page'] || 1;

      this.propertiesCountSubs = this.propertiesService
        .getPropertiesCount({ ...params })
        .subscribe({
          next: ({ numberOfProperties }) => {
            const divideBy: number = +params['limit'] || 6;
            this.totalPages = Math.ceil(numberOfProperties / divideBy);
          },
        });

      this.propertiesSubs = this.propertiesService
        .getProperties({ ...params, page: params['page'] || 1 })
        .subscribe({
          next: (responseData) => (this.properties = responseData.properties),
          error: () => (this.isLoading = false),
          complete: () => (this.isLoading = false),
        });
    });
  }

  ngOnDestroy(): void {
    this.propertiesCountSubs.unsubscribe();
    this.propertiesSubs.unsubscribe();
  }

  onFiltersUpdate(filters: PropertyQuery): void {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { ...filters, page: null },
      queryParamsHandling: 'merge',
    });
  }

  onSetSorting(event: any, sort: string | null): void {
    this.sortingText = event.target.outerText;
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { sort, page: null },
      queryParamsHandling: 'merge',
    });
  }
}
