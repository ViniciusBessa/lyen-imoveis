import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private http: HttpClient) {}

  getStates(): Observable<{ states: string[]; numberOfStates: number }> {
    return this.http.get<{ states: string[]; numberOfStates: number }>(
      `${environment.apiUrl}/locations/states`
    );
  }

  getCities(
    state?: string
  ): Observable<{ cities: string[]; numberOfCities: number }> {
    let httpParams = new HttpParams();

    if (state) {
      httpParams = httpParams.append('state', state);
    }
    return this.http.get<{ cities: string[]; numberOfCities: number }>(
      `${environment.apiUrl}/locations/cities`,
      { params: httpParams }
    );
  }
}
