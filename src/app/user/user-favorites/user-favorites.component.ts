import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/shared/models/property.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css'],
})
export class UserFavoritesComponent implements OnInit, OnDestroy {
  userStoreSubs!: Subscription;
  favoritedProperties: Property[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userStoreSubs = this.store
      .select('user')
      .subscribe(
        (userState) => (this.favoritedProperties = userState.favorites)
      );
  }

  ngOnDestroy(): void {
    this.userStoreSubs.unsubscribe();
  }
}
