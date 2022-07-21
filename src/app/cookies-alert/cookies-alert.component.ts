import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies-alert',
  templateUrl: './cookies-alert.component.html',
  styleUrls: ['./cookies-alert.component.css'],
})
export class CookiesAlertComponent implements OnInit {
  alreadyAccepted: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.alreadyAccepted = !!localStorage.getItem('cookiesAccepted');
  }

  onAcceptCookies(): void {
    this.alreadyAccepted = true;
    localStorage.setItem('cookiesAccepted', 'true');
  }
}
