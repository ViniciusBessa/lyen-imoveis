import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import * as UserActions from './user/store/user.actions';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
    this.store.dispatch(UserActions.fetchFavorites());

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Buscando o título da página no primeiro nível da rota
        let pageTitle = this.route.snapshot.firstChild?.data['title'];

        // Se o título não foi encontrado, busque no segundo nível da rota
        if (!pageTitle) {
          pageTitle = this.route.snapshot.firstChild?.firstChild?.data['title'];
        }
        this.title.setTitle(pageTitle);
      }
    });
  }
}
