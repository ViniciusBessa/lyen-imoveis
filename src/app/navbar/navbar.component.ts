import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
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
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logoutStart());
  }
}
