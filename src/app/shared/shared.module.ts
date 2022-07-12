import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PropertyItemComponent } from './components/property-item/property-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FavoriteComponent, PropertyItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [FavoriteComponent, PropertyItemComponent],
})
export class SharedModule {}
