import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CookiesAlertComponent } from './cookies-alert.component';

describe('CookiesAlertComponent', () => {
  let component: CookiesAlertComponent;
  let fixture: ComponentFixture<CookiesAlertComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookiesAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiesAlertComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the cookies alert by default', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const cookiesAlert = compiled.querySelector('.alert') as HTMLDivElement;
    expect(cookiesAlert).toBeTruthy();
  });

  it('should not display the alert because it was already accepted', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    component.ngOnInit();
    fixture.detectChanges();
    const cookiesAlert = compiled.querySelector('.alert') as HTMLDivElement;
    expect(cookiesAlert).toBeFalsy();
  });

  it('should remove the alert when it is accepted', fakeAsync(() => {
    spyOn(component, 'onAcceptCookies').and.callThrough();
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    // Clicking the alert button
    const alertBtn = compiled.querySelector(
      '.alert__accept-btn'
    ) as HTMLButtonElement;
    alertBtn.click();
    tick();
    expect(component.onAcceptCookies).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(component.alreadyAccepted).toBeTrue();
  }));
});
