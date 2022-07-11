import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/shared/models/property.model';
import * as fromApp from '../../../store/app.reducer';
import * as UserActions from '../../../user/store/user.actions';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit, OnDestroy {
  @Input() property!: Property;
  isFavorited: boolean = false;
  isLoggedIn: boolean = false;
  authStoreSubs!: Subscription;
  userStoreSubs!: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // Checking if the user is logged in
    this.authStoreSubs = this.store
      .select('auth')
      .subscribe((authState) => (this.isLoggedIn = !!authState.user));

    // Checking if the property is in the user's favorites
    this.userStoreSubs = this.store.select('user').subscribe((userData) => {
      this.isFavorited = userData.favorites.some(
        (favoritedProperty) => favoritedProperty._id === this.property._id
      );
    });
  }

  ngOnDestroy(): void {
    this.authStoreSubs.unsubscribe();
    this.userStoreSubs.unsubscribe();
  }

  onAddToFavorites(): void {
    this.store.dispatch(UserActions.addFavorite({ property: this.property }));
  }

  onRemoveFromFavorites(): void {
    this.store.dispatch(
      UserActions.removeFavorite({ property: this.property })
    );
  }
}
