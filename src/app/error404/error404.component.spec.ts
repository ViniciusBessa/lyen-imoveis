import { Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

import { Error404Component } from './error404.component';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Error404Component],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the home page', fakeAsync(
    inject([Location], (location: Location) => {
      const anchor = compiled.querySelector('a') as HTMLAnchorElement;
      anchor.click();
      tick();
      expect(location.path()).toEqual('/home');
    })
  ));
});
