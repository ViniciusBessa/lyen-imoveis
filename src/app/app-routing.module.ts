import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'properties',
    loadChildren: () =>
      import('./properties/properties.module').then(
        (module) => module.PropertiesModule
      ),
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
