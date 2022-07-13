import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PropertyQuery } from '../../models/property-query.model';
import { Property } from '../../../shared/models/property.model';
import { PropertiesService } from '../../properties.service';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css'],
})
export class PropertySearchComponent implements OnInit {
  properties: Property[] = [];
  isLoading: boolean = false;
  sortingText: string = 'Mais recentes';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.isLoading = true;
      this.propertiesService.getProperties({ ...params }).subscribe({
        next: (responseData) => (this.properties = responseData.properties),
        error: () => (this.isLoading = false),
        complete: () => (this.isLoading = false),
      });
    });
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
