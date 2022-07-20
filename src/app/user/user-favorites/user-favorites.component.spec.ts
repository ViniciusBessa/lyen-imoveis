import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Property } from 'src/app/shared/models/property.model';

import { UserFavoritesComponent } from './user-favorites.component';

describe('UserFavoritesComponent', () => {
  let component: UserFavoritesComponent;
  let fixture: ComponentFixture<UserFavoritesComponent>;
  let store: MockStore<{ favorites: Property[]}>
  const initialState = { favorites: []};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFavoritesComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
