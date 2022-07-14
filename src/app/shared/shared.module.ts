import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PropertyItemComponent } from './components/property-item/property-item.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    FavoriteComponent,
    PropertyItemComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [FavoriteComponent, PropertyItemComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
