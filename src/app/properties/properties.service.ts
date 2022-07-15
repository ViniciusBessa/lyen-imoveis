import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PropertyQuery } from './models/property-query.model';
import { Property } from '../shared/models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor(private http: HttpClient) {}

  getProperties(filters: PropertyQuery): Observable<{
    properties: Property[];
    numberOfProperties: number;
  }> {
    let httpParams = new HttpParams();
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        httpParams = httpParams.append(key, filters[key]);
      }
    }
    return this.http.get<{
      properties: Property[];
      numberOfProperties: number;
    }>(`${environment.apiUrl}/properties`, { params: httpParams });
  }

  getPropertiesCount(filters: PropertyQuery): Observable<{
    properties: Property[];
    numberOfProperties: number;
  }> {
    let httpParams = new HttpParams();
    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        httpParams = httpParams.append(key, filters[key]);
      }
    }
    httpParams = httpParams.delete('page');
    return this.http.get<{
      properties: Property[];
      numberOfProperties: number;
    }>(`${environment.apiUrl}/properties`, { params: httpParams });
  }

  getProperty(propertyId: string): Observable<{ property: Property }> {
    return this.http.get<{ property: Property }>(
      `${environment.apiUrl}/properties/${propertyId}`
    );
  }
}
