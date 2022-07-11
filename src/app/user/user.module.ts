import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserFavoritesComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
