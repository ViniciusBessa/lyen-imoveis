import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('container') navbarContainer!: ElementRef;
  isLoggedIn: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authData) => {
      // Converting the user data to a boolean
      this.isLoggedIn = !!authData.user;
    });
  }

  onToggleNavbar(): void {
    // Toggling the collapsed class
    (<HTMLElement>this.navbarContainer.nativeElement).classList.toggle(
      'collapsed'
    );
  }
}
