import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceFormatterPipe } from './price-formatter.pipe';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
  declarations: [PriceFormatterPipe, FavoriteComponent],
  imports: [CommonModule],
  exports: [PriceFormatterPipe, FavoriteComponent],
})
export class SharedModule {}
