import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { LoginRequiredGuard } from './shared/guards/login-required.guard';
import { LogoutRequiredGuard } from './shared/guards/logout-required.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LogoutRequiredGuard],
  },
  {
    path: 'properties',
    loadChildren: () =>
      import('./properties/properties.module').then(
        (module) => module.PropertiesModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((module) => module.UserModule),
    canActivate: [LoginRequiredGuard],
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
