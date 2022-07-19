import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PropertyItemComponent } from './components/property-item/property-item.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FavoriteComponent,
    PropertyItemComponent,
    LoadingSpinnerComponent,
    ImageGalleryComponent,
    SearchFormComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    FavoriteComponent,
    PropertyItemComponent,
    LoadingSpinnerComponent,
    ImageGalleryComponent,
    SearchFormComponent,
  ],
})
export class SharedModule {}
