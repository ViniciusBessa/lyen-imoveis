import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';

const userRoutes: Routes = [
  { path: 'favorites', component: UserFavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
