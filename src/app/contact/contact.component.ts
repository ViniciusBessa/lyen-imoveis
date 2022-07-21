import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('alert', [
      transition(
        'void => *',
        animate(
          500,
          keyframes([
            style({ bottom: '-24px', opacity: 0, offset: 0 }),
            style({ bottom: '0px', opacity: 0.5, offset: 0.7 }),
            style({ bottom: '12px', opacity: 1, offset: 1 }),
          ])
        )
      ),
      transition(
        '* => void',
        animate(
          500,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, offset: 1 }),
          ])
        )
      ),
    ]),
  ],
})
export class ContactComponent implements OnInit {
  messageForm!: FormGroup;
  showAlert: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.messageForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),

      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),

      message: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit(): void {
    if (this.messageForm.valid) {
      this.showAlert = true;
      const timeoutRef = setTimeout(() => {
        this.showAlert = false;
        clearTimeout(timeoutRef);
      }, 4000);
    }
  }
}
