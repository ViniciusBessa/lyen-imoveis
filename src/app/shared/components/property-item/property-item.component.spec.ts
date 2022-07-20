import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteComponent } from '../favorite/favorite.component';

import { PropertyItemComponent } from './property-item.component';

describe('PropertyItemComponent', () => {
  let component: PropertyItemComponent;
  let fixture: ComponentFixture<PropertyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyItemComponent, FavoriteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
