import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceFormatterPipe } from './pipes/price-formatter.pipe';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PropertyItemComponent } from './components/property-item/property-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PriceFormatterPipe, FavoriteComponent, PropertyItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [PriceFormatterPipe, FavoriteComponent, PropertyItemComponent],
})
export class SharedModule {}
