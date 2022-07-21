import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the alert', () => {
    const alert = compiled.querySelector('.alert') as HTMLSpanElement;
    expect(component.showAlert).toBeFalse();
    expect(alert).toBeFalsy();
  });

  it('should display the alert', () => {
    component.showAlert = true;
    fixture.detectChanges();
    const alert = compiled.querySelector('.alert') as HTMLSpanElement;
    expect(component.showAlert).toBeTrue();
    expect(alert).toBeTruthy();
  });

  it('should fail to submit the form', fakeAsync(() => {
    spyOn(component, 'onSubmit');
    const messageForm = component.messageForm;

    // Updating the form fields
    messageForm.patchValue({
      name: 'test',
      email: 'test',
      message: 'test',
    });

    // Submitting the form
    const submitBtn = compiled.querySelector(
      '.form__submit-btn'
    ) as HTMLButtonElement;
    submitBtn.click();
    tick();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(messageForm.valid).toBeFalse();
    expect(messageForm.get('name')?.valid).toBeFalse();
    expect(messageForm.get('email')?.valid).toBeFalse();
    expect(messageForm.get('message')?.valid).toBeFalse();
  }));

  it('should submit the form successfully', fakeAsync(() => {
    spyOn(component, 'onSubmit');
    const messageForm = component.messageForm;

    // Updating the form fields
    messageForm.patchValue({
      name: 'testName',
      email: 'test@gmail.com',
      message: 'Just a test message',
    });

    // Submitting the form
    const submitBtn = compiled.querySelector(
      '.form__submit-btn'
    ) as HTMLButtonElement;
    submitBtn.click();
    tick();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(messageForm.valid).toBeTrue();
    expect(messageForm.get('name')?.valid).toBeTrue();
    expect(messageForm.get('email')?.valid).toBeTrue();
    expect(messageForm.get('message')?.valid).toBeTrue();
  }));
});
