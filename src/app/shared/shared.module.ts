import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PropertyItemComponent } from './components/property-item/property-item.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';

@NgModule({
  declarations: [
    FavoriteComponent,
    PropertyItemComponent,
    LoadingSpinnerComponent,
    ImageGalleryComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    FavoriteComponent,
    PropertyItemComponent,
    LoadingSpinnerComponent,
    ImageGalleryComponent,
  ],
})
export class SharedModule {}
