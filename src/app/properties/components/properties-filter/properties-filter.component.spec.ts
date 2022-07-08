import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesFilterComponent } from './properties-filter.component';

describe('PropertiesFilterComponent', () => {
  let component: PropertiesFilterComponent;
  let fixture: ComponentFixture<PropertiesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
