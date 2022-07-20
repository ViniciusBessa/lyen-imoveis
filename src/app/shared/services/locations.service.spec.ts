import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(LocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 3 cities', fakeAsync(() => {
    spyOn(service, 'getCities').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          cities: ['São Paulo', 'Rio de Janeiro', 'Manaus'],
          numberOfCities: 3,
        })
      )
    );
    let cities: string[] = [];
    let numberCities: number = 0;

    service.getCities().subscribe({
      next: (response) => {
        cities = response.cities;
        numberCities = response.numberOfCities;
      },
    });
    tick();
    expect(cities).toEqual(['São Paulo', 'Rio de Janeiro', 'Manaus']);
    expect(cities.length).toBe(3);
    expect(numberCities).toBe(3);
  }));

  it('should return 4 states', fakeAsync(() => {
    spyOn(service, 'getStates').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({
          states: ['Maranhão', 'Alagoas', 'Santa Catarina', 'Espírito Santo'],
          numberOfStates: 4,
        })
      )
    );
    let states: string[] = [];
    let numberStates: number = 0;

    service.getStates().subscribe({
      next: (response) => {
        states = response.states;
        numberStates = response.numberOfStates;
      },
    });
    tick();
    expect(states).toEqual([
      'Maranhão',
      'Alagoas',
      'Santa Catarina',
      'Espírito Santo',
    ]);
    expect(states.length).toBe(4);
    expect(numberStates).toBe(4);
  }));
});
