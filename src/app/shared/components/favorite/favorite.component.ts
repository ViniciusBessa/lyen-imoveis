import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  private authStoreSubs!: Subscription;
  private userStoreSubs!: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

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
    if (this.isLoggedIn) {
      this.store.dispatch(UserActions.addFavorite({ property: this.property }));
    } else {
      this.router.navigate(['/auth'], {
        queryParams: { next: this.router.url },
      });
    }
  }

  onRemoveFromFavorites(): void {
    if (this.isLoggedIn) {
      this.store.dispatch(
        UserActions.removeFavorite({ property: this.property })
      );
    } else {
      this.router.navigate(['/auth'], {
        queryParams: { next: this.router.url },
      });
    }
  }
}
