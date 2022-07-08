import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Property } from '../../models/property.model';
import { PropertiesService } from '../../properties.service';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css'],
})
export class PropertyPageComponent implements OnInit {
  property!: Property;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.propertiesService.getProperty(params['propertyId']).subscribe({
        next: (response) => {
          this.property = response.property;
        },
        error: () => this.router.navigate(['/error404']),
      });
    });
  }
}
